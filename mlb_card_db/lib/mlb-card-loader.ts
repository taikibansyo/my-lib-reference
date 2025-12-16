import fs from "node:fs/promises"
import path from "node:path"
import { parseCsv } from "./csv-parser"

export type MlbCardRecord = {
  no: number | null
  issuer: string
  issuerPrefix: string
  managementId: string
  year: number | null
  series: string
  seriesPrefix: string
  distribution: string
  cardNumber: string
  playerName: string
  team: string
  category: string
  parallelOrAuto: string
  baseOrInserts: string
  serialNumber: string
  quantity: number | null
  condition: string
  status: string
  purchaseDate: string
  price: string
  note: string
}

type ColumnKey = keyof MlbCardRecord

const headerMap: Record<string, ColumnKey> = {
  "No.": "no",
  発行元: "issuer",
  発行元Prefix: "issuerPrefix",
  管理用ID: "managementId",
  年: "year",
  "BOX/シリーズ": "series",
  "BOX/シリーズPrefix": "seriesPrefix",
  Distribution: "distribution",
  カード番号: "cardNumber",
  選手名: "playerName",
  チーム名: "team",
  種別: "category",
  "パラレル/オート": "parallelOrAuto",
  "Base / Inserts": "baseOrInserts",
  "シリアルNo.": "serialNumber",
  枚数: "quantity",
  状態: "condition",
  ステータス: "status",
  購入日: "purchaseDate",
  購入価格: "price",
  メモ: "note",
}

const numericKeys: Set<ColumnKey> = new Set(["no", "year", "quantity"])

const emptyRecord: MlbCardRecord = {
  no: null,
  issuer: "",
  issuerPrefix: "",
  managementId: "",
  year: null,
  series: "",
  seriesPrefix: "",
  distribution: "",
  cardNumber: "",
  playerName: "",
  team: "",
  category: "",
  parallelOrAuto: "",
  baseOrInserts: "",
  serialNumber: "",
  quantity: null,
  condition: "",
  status: "",
  purchaseDate: "",
  price: "",
  note: "",
}

function parseNumeric(value: string): number | null {
  const clean = value.replace(/[^\d.-]/g, "")
  const numeric = Number(clean)
  return Number.isFinite(numeric) ? numeric : null
}

function mapRow(headers: string[], row: string[]): MlbCardRecord {
  const record: MlbCardRecord = { ...emptyRecord }
  const writable = record as Record<ColumnKey, string | number | null>

  headers.forEach((header, index) => {
    const key = headerMap[header]
    if (!key) return

    const rawValue = (row[index] ?? "").trim()
    if (!rawValue) return

    if (numericKeys.has(key)) {
      writable[key] = parseNumeric(rawValue)
    } else {
      writable[key] = rawValue
    }
  })

  return record
}

const csvCandidates = [
  path.join(process.cwd(), "mlb_card_db", "data", "mlb_cards.csv"),
  path.join(process.cwd(), "mlb_card_db", "src", "mlb_cards.csv"),
  path.join(process.cwd(), "mlb_card_db", "src", "ToDo - MLBトレカ.csv"),
]

async function findCsvPath(): Promise<string> {
  for (const candidate of csvCandidates) {
    try {
      await fs.access(candidate)
      return candidate
    } catch {
      // try next
    }
  }
  throw new Error(
    `CSV ファイルが見つかりませんでした。候補: ${csvCandidates.join(", ")}`,
  )
}

export async function loadMlbCardRecords(): Promise<MlbCardRecord[]> {
  let csvPath: string
  try {
    csvPath = await findCsvPath()
  } catch (error) {
    console.warn(error)
    return []
  }

  const csvText = await fs.readFile(csvPath, "utf-8")
  const rows = parseCsv(csvText)

  if (rows.length === 0) {
    return []
  }

  const [headers, ...dataRows] = rows

  return dataRows
    .filter((row) => row.some((cell) => cell.trim().length > 0))
    .map((row) => mapRow(headers, row))
}
