export type Rung = { row: number; col: number };

export type LadderShape = {
  cols: number;
  rows: number;
  rungs: Rung[];
};

export type RungMap = Map<number, Set<number>>;

export function buildRungMap(rungs: Rung[]): RungMap {
  return rungs.reduce<RungMap>((acc, rung) => {
    const row = acc.get(rung.row) ?? new Set<number>();
    row.add(rung.col);
    acc.set(rung.row, row);
    return acc;
  }, new Map());
}

export function ensureGoalLabels(labels: string[], count: number): string[] {
  const normalized = labels.map((label) => label.trim()).filter((label) => label.length > 0);
  const result = [...normalized];
  while (result.length < count) {
    result.push(`ゴール${result.length + 1}`);
  }
  return result.slice(0, count);
}

export function sanitizeEntries(values: string[]): string[] {
  return values.map((value) => value.trim()).filter((value) => value.length > 0);
}

export function traverseLadder({ cols, rows, rungs }: LadderShape, start: number): number {
  const map = buildRungMap(rungs);
  return traverseWithMap({ cols, rows, map }, start);
}

type TraverseConfig = {
  cols: number;
  rows: number;
  map: RungMap;
};

export function traverseWithMap({ cols, rows, map }: TraverseConfig, start: number): number {
  let column = start;
  for (let row = 0; row < rows; row++) {
    const rungs = map.get(row);
    if (rungs?.has(column)) {
      column = Math.min(column + 1, cols - 1);
    } else if (rungs?.has(column - 1)) {
      column = Math.max(column - 1, 0);
    }
  }
  return column;
}

export function createRungs(cols: number, rows: number, random: () => number = Math.random): Rung[] {
  const rungs: Rung[] = [];
  for (let row = 0; row < rows; row++) {
    if (random() < 0.6) {
      const candidates: number[] = [];
      for (let col = 0; col < cols - 1; col++) {
        const conflict = rungs.some((existing) => existing.row === row && (existing.col === col || existing.col === col - 1 || existing.col === col + 1));
        if (!conflict) {
          candidates.push(col);
        }
      }
      if (candidates.length > 0) {
        const choice = candidates[Math.floor(random() * candidates.length)];
        rungs.push({ row, col: choice });
      }
    }
  }
  return rungs.sort((a, b) => a.row - b.row);
}

export function createAssignments(participants: string[], goals: string[], shape: LadderShape): Record<string, string> {
  const map = buildRungMap(shape.rungs);
  const assignments: Record<string, string> = {};
  participants.forEach((participant, index) => {
    const goalIndex = traverseWithMap({ cols: shape.cols, rows: shape.rows, map }, index);
    assignments[participant] = goals[goalIndex] ?? `ゴール${goalIndex + 1}`;
  });
  return assignments;
}

