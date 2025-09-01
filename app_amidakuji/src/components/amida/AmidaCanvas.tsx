"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAmidaStore } from "@/store/useAmidaStore";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function AmidaCanvas({ className }: Props) {
  const { participants, goals, rows, rungs, selectedStart, pickStart, computeEnd, setStatus, saveHistory } = useAmidaStore();
  const cols = participants.length;

  const [animDone, setAnimDone] = useState(false);

  useEffect(() => {
    if (animDone && selectedStart != null) {
      const mapping: Record<string, string> = {};
      participants.forEach((p, i) => {
        const e = computeEnd(i);
        mapping[p] = goals[e] ?? `ゴール${e + 1}`;
      });
      saveHistory(mapping);
      setStatus("done");
    }
  }, [animDone, selectedStart]);

  const padding = 16;
  const rungStroke = 3;
  const height = 360;

  const computePoints = (start: number, width: number): string => {
    const innerW = width - padding * 2;
    const innerH = height - padding * 2;
    const colGap = innerW / (cols - 1 || 1);
    const rowGap = innerH / (rows - 1 || 1);
    const x = (c: number) => padding + c * colGap;
    const y = (r: number) => padding + r * rowGap;

    let c = start;
    const pts: [number, number][] = [];
    pts.push([x(c), y(0)]);
    for (let r = 0; r < rows; r++) {
      pts.push([x(c), y(r)]);
      const right = rungs.some((h) => h.row === r && h.col === c);
      const left = rungs.some((h) => h.row === r && h.col === c - 1);
      if (right) {
        pts.push([x(c + 1), y(r)]);
        c = Math.min(c + 1, cols - 1);
      } else if (left) {
        pts.push([x(c - 1), y(r)]);
        c = Math.max(c - 1, 0);
      }
    }
    pts.push([x(c), padding + innerH]);
    return pts.map((p) => p.join(",")).join(" ");
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(320);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(() => setW(el.clientWidth));
    obs.observe(el);
    setW(el.clientWidth);
    return () => obs.disconnect();
  }, []);

  const pathRef = useRef<SVGPolylineElement>(null);
  const [dash, setDash] = useState<number>(0);
  const points = useMemo(() => (selectedStart != null ? computePoints(selectedStart, w) : ""), [selectedStart, w, cols, rows, rungs]);
  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const nums = points.split(" ").map((p) => p.split(",").map(Number) as [number, number]);
    let len = 0;
    for (let i = 1; i < nums.length; i++) {
      const dx = nums[i][0] - nums[i - 1][0];
      const dy = nums[i][1] - nums[i - 1][1];
      len += Math.hypot(dx, dy);
    }
    setDash(len);
  }, [points]);

  useEffect(() => {
    if (!points) return;
    setAnimDone(false);
    const t = setTimeout(() => setAnimDone(true), 900);
    return () => clearTimeout(t);
  }, [points]);

  if (cols === 0) return null;

  const innerW = w - padding * 2;
  const innerH = height - padding * 2;
  const colGap = innerW / (cols - 1 || 1);
  const rowGap = innerH / (rows - 1 || 1);
  const x = (c: number) => padding + c * colGap;
  const y = (r: number) => padding + r * rowGap;

  return (
    <div ref={containerRef} className={cn("w-full", className)}>
      <svg width={w} height={height} viewBox={`0 0 ${w} ${height}`} className="mx-auto select-none">
        {Array.from({ length: cols }).map((_, c) => (
          <line key={c} x1={x(c)} y1={padding} x2={x(c)} y2={padding + innerH} stroke="#94a3b8" strokeWidth={2} />
        ))}
        {rungs.map((h, i) => (
          <line key={i} x1={x(h.col)} y1={y(h.row)} x2={x(h.col + 1)} y2={y(h.row)} stroke="#94a3b8" strokeWidth={rungStroke} />
        ))}
        {participants.map((p, i) => (
          <g key={i} onClick={() => pickStart(i)} className="cursor-pointer">
            <circle cx={x(i)} cy={padding - 8} r={6} fill={selectedStart === i ? "#22c55e" : "#cbd5e1"} />
            <text x={x(i)} y={padding - 14} textAnchor="middle" fontSize={10} fill="#64748b">{i + 1}</text>
          </g>
        ))}
        {goals.map((g, i) => (
          <text key={i} x={x(i)} y={padding + innerH + 18} textAnchor="middle" fontSize={12} fill="#334155">{g}</text>
        ))}
        {selectedStart != null && (
          <polyline
            ref={pathRef}
            points={points}
            fill="none"
            stroke="#22c55e"
            strokeWidth={4}
            style={{ strokeDasharray: dash, strokeDashoffset: dash }}
            className="amida-trace"
          />
        )}
      </svg>
      <div className="mt-2 text-center text-xs text-gray-500">上の丸をタップしてスタート</div>
    </div>
  );
}

