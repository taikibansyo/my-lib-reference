"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { MlbCardRecord } from "../lib/mlb-card-loader"

type ColumnType = "text" | "number" | "date"

type ColumnDef = {
  key: keyof MlbCardRecord
  label: string
  type: ColumnType
  minWidth?: string
  wrap?: boolean
}

const columns: ColumnDef[] = [
  { key: "no", label: "No.", type: "number", minWidth: "80px" },
  { key: "issuer", label: "発行元", type: "text", minWidth: "120px" },
  { key: "issuerPrefix", label: "発行元Prefix", type: "text", minWidth: "110px" },
  { key: "managementId", label: "管理用ID", type: "text", minWidth: "160px" },
  { key: "year", label: "年", type: "number", minWidth: "80px" },
  { key: "series", label: "BOX/シリーズ", type: "text", minWidth: "180px" },
  { key: "seriesPrefix", label: "BOX/シリーズPrefix", type: "text", minWidth: "150px" },
  { key: "distribution", label: "Distribution", type: "text", minWidth: "200px", wrap: true },
  { key: "cardNumber", label: "カード番号", type: "text", minWidth: "120px" },
  { key: "playerName", label: "選手名", type: "text", minWidth: "140px" },
  { key: "team", label: "チーム名", type: "text", minWidth: "150px" },
  { key: "category", label: "種別", type: "text", minWidth: "100px" },
  { key: "parallelOrAuto", label: "パラレル/オート", type: "text", minWidth: "140px" },
  { key: "baseOrInserts", label: "Base / Inserts", type: "text", minWidth: "130px" },
  { key: "serialNumber", label: "シリアルNo.", type: "text", minWidth: "120px" },
  { key: "quantity", label: "枚数", type: "number", minWidth: "80px" },
  { key: "condition", label: "状態", type: "text", minWidth: "100px" },
  { key: "status", label: "ステータス", type: "text", minWidth: "110px" },
  { key: "purchaseDate", label: "購入日", type: "date", minWidth: "110px" },
  { key: "price", label: "購入価格", type: "text", minWidth: "130px" },
  { key: "note", label: "メモ", type: "text", minWidth: "260px", wrap: true },
]

type SortDirection = "asc" | "desc"

const initialFilters = columns.reduce(
  (acc, column) => {
    acc[column.key] = ""
    return acc
  },
  {} as Record<keyof MlbCardRecord, string>,
)

function normalizeSortableValue(
  value: string | number | null,
  type: ColumnType,
): string | number | null {
  if (value === null) return null

  if (type === "number") {
    const numeric = Number(value)
    return Number.isFinite(numeric) ? numeric : null
  }

  if (type === "date") {
    const timestamp = Date.parse(String(value))
    return Number.isNaN(timestamp) ? null : timestamp
  }

  return String(value).toLowerCase()
}

export function MlbCardTable({ records }: { records: MlbCardRecord[] }) {
  const [filters, setFilters] = useState<Record<keyof MlbCardRecord, string>>(
    () => ({ ...initialFilters }),
  )
  const [sortKey, setSortKey] = useState<keyof MlbCardRecord>("no")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  const filteredAndSorted = useMemo(() => {
    const filtered = records.filter((record) =>
      columns.every((column) => {
        const filterValue = filters[column.key]
        if (!filterValue) return true

        const recordValue = record[column.key]
        if (recordValue === null) return false

        return String(recordValue)
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      }),
    )

    const currentColumn =
      columns.find((column) => column.key === sortKey) ?? columns[0]
    const sortType = currentColumn.type

    return [...filtered].sort((a, b) => {
      const direction = sortDirection === "asc" ? 1 : -1
      const aValue = normalizeSortableValue(a[sortKey], sortType)
      const bValue = normalizeSortableValue(b[sortKey], sortType)

      if (aValue === null && bValue === null) return 0
      if (aValue === null) return 1
      if (bValue === null) return -1

      if (typeof aValue === "number" && typeof bValue === "number") {
        return (aValue - bValue) * direction
      }

      return (
        String(aValue).localeCompare(String(bValue), "ja") * direction
      )
    })
  }, [filters, records, sortDirection, sortKey])

  const handleFilterChange = (key: keyof MlbCardRecord, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const toggleSort = (key: keyof MlbCardRecord) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
      return
    }
    setSortKey(key)
    setSortDirection("asc")
  }

  const handleReset = () => {
    setFilters(() => ({ ...initialFilters }))
    setSortKey("no")
    setSortDirection("asc")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span>
          表示 {filteredAndSorted.length} 件 / 総 {records.length} 件
        </span>
        <span className="text-xs">各列の入力欄で部分一致フィルターできます</span>
        <Button size="sm" variant="outline" onClick={handleReset}>
          フィルターとソートをリセット
        </Button>
      </div>
      <div className="overflow-x-auto rounded-lg border bg-card text-card-foreground shadow-sm">
        <table className="w-full min-w-[1280px] text-sm">
          <thead className="bg-muted/60">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-3 py-2 text-left font-semibold"
                  style={{ minWidth: column.minWidth }}
                >
                  <button
                    type="button"
                    onClick={() => toggleSort(column.key)}
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    <span>{column.label}</span>
                    {sortKey === column.key && (
                      <span className="text-[11px] uppercase text-primary">
                        {sortDirection}
                      </span>
                    )}
                  </button>
                </th>
              ))}
            </tr>
            <tr>
              {columns.map((column) => (
                <th key={`${column.key}-filter`} className="px-3 pb-3">
                  <input
                    value={filters[column.key]}
                    onChange={(event) =>
                      handleFilterChange(column.key, event.target.value)
                    }
                    type={column.type === "number" ? "number" : "text"}
                    inputMode={column.type === "number" ? "numeric" : "text"}
                    placeholder="フィルター"
                    className="w-full rounded-md border border-border bg-background px-2 py-1 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.map((record, index) => {
              const baseKey =
                record.managementId ||
                `${record.no ?? "n/a"}-${record.cardNumber}-${record.playerName}`
              const rowKey = `${baseKey}-${index}`

              return (
                <tr key={rowKey} className="odd:bg-muted/30">
                  {columns.map((column) => {
                    const cellValue = record[column.key]
                    const displayValue =
                      cellValue === null || cellValue === ""
                        ? "—"
                        : cellValue

                    return (
                      <td
                        key={`${rowKey}-${column.key}`}
                        className={cn(
                          "px-3 py-2 align-top text-sm",
                          column.wrap ? "whitespace-normal" : "whitespace-nowrap",
                        )}
                        style={{ minWidth: column.minWidth }}
                      >
                        {displayValue}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
