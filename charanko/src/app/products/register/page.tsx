"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function ProductRegisterPage() {
  const [formData, setFormData] = useState({
    images: [] as File[],
    name: "",
    category: "",
    condition: "",
    description: "",
    exchangeDetails: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, images: Array.from(e.target.files) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("商品登録データ:", formData);
  };

  return (
    <main className="p-10 bg-background text-foreground max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/">
          <Button variant="outline">← TOPに戻る</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>商品登録</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="images">出品画像</Label>
              <input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
              <p className="text-sm text-muted-foreground">
                複数の画像を選択できます（最大10枚）
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">商品名</Label>
              <input
                id="name"
                placeholder="商品名を入力してください"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">カテゴリー</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="カテゴリーを選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">家電・電子機器</SelectItem>
                  <SelectItem value="books">本・雑誌</SelectItem>
                  <SelectItem value="clothing">衣類・ファッション</SelectItem>
                  <SelectItem value="sports">スポーツ・アウトドア</SelectItem>
                  <SelectItem value="hobbies">ホビー・コレクション</SelectItem>
                  <SelectItem value="furniture">家具・インテリア</SelectItem>
                  <SelectItem value="other">その他</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">商品の状態</Label>
              <Select
                value={formData.condition}
                onValueChange={(value) =>
                  setFormData({ ...formData, condition: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="商品の状態を選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">新品・未使用</SelectItem>
                  <SelectItem value="like-new">未使用に近い</SelectItem>
                  <SelectItem value="good">目立った傷や汚れなし</SelectItem>
                  <SelectItem value="fair">やや傷や汚れあり</SelectItem>
                  <SelectItem value="poor">傷や汚れあり</SelectItem>
                  <SelectItem value="damaged">全体的に状態が悪い</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">商品の説明</Label>
              <Textarea
                id="description"
                placeholder="商品の詳細、使用感、注意点などを入力してください"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="exchangeDetails">交換希望商品の詳細</Label>
              <Textarea
                id="exchangeDetails"
                placeholder="どのような商品と交換したいか、条件などを入力してください"
                value={formData.exchangeDetails}
                onChange={(e) =>
                  setFormData({ ...formData, exchangeDetails: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                商品を登録する
              </Button>
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  キャンセル
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
