"use client"

import { useMemo, useState } from "react"
import cardsData from "../../../public/data/mlb_cards.json"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type CardRow = {
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

const cards: CardRow[] = cardsData as CardRow[]

export default function MlbDbPage() {
  const [yearFilter, setYearFilter] = useState("")
  const [playerFilter, setPlayerFilter] = useState("")
  const [seriesFilter, setSeriesFilter] = useState("")

  const filteredCards = useMemo(() => {
    const year = yearFilter.trim().toLowerCase()
    const player = playerFilter.trim().toLowerCase()
    const series = seriesFilter.trim().toLowerCase()

    return cards.filter((card) => {
      const matchYear = year
        ? String(card.year ?? "").toLowerCase().includes(year)
        : true
      const matchPlayer = player
        ? (card.playerName ?? "").toLowerCase().includes(player)
        : true
      const matchSeries = series
        ? (card.boxSeries ?? "").toLowerCase().includes(series)
        : true

      return matchYear && matchPlayer && matchSeries
    })
  }, [playerFilter, seriesFilter, yearFilter])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              MLBカード データベース
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              Topps MLB カードのコレクション一覧です。年・選手名・BOX/シリーズ名で絞り込みできます。
            </p>
            <p>該当 {filteredCards.length} 件 / 総 {cards.length} 件</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">フィルター</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground" htmlFor="year">
                年（部分一致）
              </label>
              <Input
                id="year"
                placeholder="例: 2025"
                value={yearFilter}
                onChange={(event) => setYearFilter(event.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label
                className="text-sm text-muted-foreground"
                htmlFor="playerName"
              >
                選手名（部分一致）
              </label>
              <Input
                id="playerName"
                placeholder="例: Shohei Ohtani / 大谷"
                value={playerFilter}
                onChange={(event) => setPlayerFilter(event.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label
                className="text-sm text-muted-foreground"
                htmlFor="boxSeries"
              >
                BOX/シリーズ（部分一致）
              </label>
              <Input
                id="boxSeries"
                placeholder="例: Topps Series"
                value={seriesFilter}
                onChange={(event) => setSeriesFilter(event.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">カード一覧</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <HeaderCell>No.</HeaderCell>
                    <HeaderCell>年</HeaderCell>
                    <HeaderCell>BOX/シリーズ</HeaderCell>
                    <HeaderCell>カード番号</HeaderCell>
                    <HeaderCell>選手名</HeaderCell>
                    <HeaderCell>Distribution</HeaderCell>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredCards.map((card, index) => (
                    <tr
                      key={`${card.manageId || card.cardNo || card.playerName || "row"}-${index}`}
                    >
                      <BodyCell>{card.no ?? "—"}</BodyCell>
                      <BodyCell>{card.year ?? "—"}</BodyCell>
                      <BodyCell className="whitespace-nowrap">
                        {card.boxSeries || "—"}
                      </BodyCell>
                      <BodyCell>{card.cardNo || "—"}</BodyCell>
                      <BodyCell>{card.playerName || "—"}</BodyCell>
                      <BodyCell className="whitespace-nowrap">
                        {card.distribution || "—"}
                      </BodyCell>
                    </tr>
                  ))}
                  {filteredCards.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-6 text-center text-muted-foreground"
                      >
                        該当するカードがありません
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

function HeaderCell({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      {children}
    </th>
  )
}

function BodyCell({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <td className={cn("px-4 py-3 text-sm", className)}>
      {children}
    </td>
  )
}
