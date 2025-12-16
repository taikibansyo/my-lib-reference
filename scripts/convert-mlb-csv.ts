import fs from "node:fs/promises"
import path from "node:path"
import { parse } from "csv-parse/sync"

export type CardRow = {
  no: number | null
  publisher: string
  publisherPrefix: string
  manageId: string
  year: number | null
  boxSeries: string
  boxPrefix: string
  distribution: string
  cardNo: string
  playerName: string
  teamName: string
  category: string
  parallelOrAuto: string
  baseOrInserts: string
  serialNo: string
  quantity: number | null
  condition: string
  status: string
  purchaseDate: string
  price: string
  note: string
}

const csvCandidates = [
  path.join(process.cwd(), "data", "mlb_cards.csv"),
  path.join(process.cwd(), "mlb_card_db", "data", "mlb_cards.csv"),
  path.join(process.cwd(), "mlb_card_db", "src", "mlb_cards.csv"),
]

const outputPath = path.join(process.cwd(), "public", "data", "mlb_cards.json")

const headerMap: Record<string, keyof CardRow> = {
  no: "no",
  "No.": "no",
  番号: "no",
  publisher: "publisher",
  発行元: "publisher",
  publisherPrefix: "publisherPrefix",
  発行元Prefix: "publisherPrefix",
  manageId: "manageId",
  管理用ID: "manageId",
  year: "year",
  年: "year",
  boxSeries: "boxSeries",
  "BOX/シリーズ": "boxSeries",
  boxPrefix: "boxPrefix",
  "BOX/シリーズPrefix": "boxPrefix",
  distribution: "distribution",
  cardNo: "cardNo",
  カード番号: "cardNo",
  playerName: "playerName",
  選手名: "playerName",
  teamName: "teamName",
  チーム名: "teamName",
  category: "category",
  種別: "category",
  parallelOrAuto: "parallelOrAuto",
  "パラレル/オート": "parallelOrAuto",
  baseOrInserts: "baseOrInserts",
  "Base / Inserts": "baseOrInserts",
  serialNo: "serialNo",
  "シリアルNo.": "serialNo",
  quantity: "quantity",
  枚数: "quantity",
  condition: "condition",
  状態: "condition",
  status: "status",
  ステータス: "status",
  purchaseDate: "purchaseDate",
  購入日: "purchaseDate",
  price: "price",
  購入価格: "price",
  note: "note",
  メモ: "note",
}

const numericKeys: Set<keyof CardRow> = new Set(["no", "year", "quantity"])

function coerceNumber(value: string): number | null {
  if (!value) return null
  const numeric = Number(value.replace(/[^\d.-]/g, ""))
  return Number.isFinite(numeric) ? numeric : null
}

function normalizeRow(raw: Record<string, string>): CardRow {
  const base: CardRow = {
    no: null,
    publisher: "",
    publisherPrefix: "",
    manageId: "",
    year: null,
    boxSeries: "",
    boxPrefix: "",
    distribution: "",
    cardNo: "",
    playerName: "",
    teamName: "",
    category: "",
    parallelOrAuto: "",
    baseOrInserts: "",
    serialNo: "",
    quantity: null,
    condition: "",
    status: "",
    purchaseDate: "",
    price: "",
    note: "",
  }

  const writable = base as Record<keyof CardRow, string | number | null>

  Object.entries(raw).forEach(([header, value]) => {
    const key = headerMap[header.trim()] ?? headerMap[header.trim().toLowerCase()]
    if (!key) return

    const trimmed = value?.trim?.() ?? ""
    if (numericKeys.has(key)) {
      writable[key] = coerceNumber(trimmed)
      return
    }
    writable[key] = trimmed
  })

  return base
}

async function ensureOutputDir() {
  const dir = path.dirname(outputPath)
  await fs.mkdir(dir, { recursive: true })
}

async function findCsvPath(): Promise<string> {
  for (const candidate of csvCandidates) {
    try {
      await fs.access(candidate)
      return candidate
    } catch {
      // try next candidate
    }
  }
  throw new Error(
    `CSV ファイルが見つかりませんでした。候補: ${csvCandidates.join(", ")}`,
  )
}

async function readCsv(csvPath: string): Promise<string> {
  return fs.readFile(csvPath, "utf-8")
}

async function writeJson(rows: CardRow[]) {
  const json = JSON.stringify(rows, null, 2)
  await ensureOutputDir()
  await fs.writeFile(outputPath, json, "utf-8")
}

async function main() {
  const csvPath = await findCsvPath()
  const csvText = await readCsv(csvPath)

  const parsed = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    bom: true,
    trim: true,
  }) as Record<string, string>[]

  const rows = parsed.map((record) => normalizeRow(record))

  await writeJson(rows)

  console.log(
    `Converted ${rows.length} rows from ${path.relative(process.cwd(), csvPath)} -> ${path.relative(process.cwd(), outputPath)}`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
