import { MlbCardTable } from "../../mlb_card_db/components/mlb-card-table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { loadMlbCardRecords } from "../../mlb_card_db/lib/mlb-card-loader"

export default async function Page() {
  const records = await loadMlbCardRecords()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl space-y-6 p-6 md:p-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              MLBカード データベースビューア
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              mlb_card_db/src/ToDo - MLBトレカ.csv を読み込み、各項目ごとにフィルターと
              ソートができるテーブルを表示しています。
            </p>
            <p>
              列名をクリックすると昇順/降順に切り替え、入力欄は部分一致フィルターとして
              使えます。
            </p>
            <p>現在のデータ件数: {records.length} 件</p>
          </CardContent>
        </Card>

        <MlbCardTable records={records} />
      </div>
    </main>
  )
}
