"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuthStore, type Address } from "@/store/useAuthStore";

const addressSchema = z.object({
  postalCode: z.string().regex(/^\d{3}-\d{4}$/, "郵便番号は123-4567の形式で入力してください"),
  prefecture: z.string().min(1, "都道府県を選択してください"),
  city: z.string().min(1, "市区町村を入力してください"),
  street: z.string().min(1, "町名・番地を入力してください"),
  building: z.string().optional(),
});

type AddressFormData = z.infer<typeof addressSchema>;

const prefectures = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
];

export default function AddressForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const { user, setUser, isLoading, setLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddressFormData>({
    defaultValues: {
      postalCode: user?.address?.postalCode || "",
      prefecture: user?.address?.prefecture || "",
      city: user?.address?.city || "",
      street: user?.address?.street || "",
      building: user?.address?.building || "",
    },
  });

  const onSubmit = async (data: AddressFormData) => {
    if (!user) return;

    try {
      setError("");
      setSuccess("");
      setLoading(true);

      const response = await fetch(`/api/user/${user.id}/address`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "住所の更新に失敗しました");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setSuccess("住所を更新しました");
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "住所の更新に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset({
      postalCode: user?.address?.postalCode || "",
      prefecture: user?.address?.prefecture || "",
      city: user?.address?.city || "",
      street: user?.address?.street || "",
      building: user?.address?.building || "",
    });
    setIsEditing(false);
    setError("");
    setSuccess("");
  };

  if (!user) return null;

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">住所情報</h2>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            {user.address ? "編集" : "登録"}
          </Button>
        )}
      </div>

      {!isEditing ? (
        <div className="space-y-4">
          {user.address ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  郵便番号
                </label>
                <p className="mt-1 text-lg">{user.address.postalCode}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  都道府県
                </label>
                <p className="mt-1 text-lg">{user.address.prefecture}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  市区町村
                </label>
                <p className="mt-1 text-lg">{user.address.city}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  町名・番地
                </label>
                <p className="mt-1 text-lg">{user.address.street}</p>
              </div>
              {user.address.building && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    建物名・部屋番号
                  </label>
                  <p className="mt-1 text-lg">{user.address.building}</p>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-500">住所が登録されていません</p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium mb-1">
              郵便番号
            </label>
            <input
              id="postalCode"
              type="text"
              placeholder="123-4567"
              {...register("postalCode")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="prefecture" className="block text-sm font-medium mb-1">
              都道府県
            </label>
            <select
              id="prefecture"
              {...register("prefecture")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
            >
              <option value="">選択してください</option>
              {prefectures.map((pref) => (
                <option key={pref} value={pref}>
                  {pref}
                </option>
              ))}
            </select>
            {errors.prefecture && (
              <p className="text-red-500 text-sm mt-1">{errors.prefecture.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-1">
              市区町村
            </label>
            <input
              id="city"
              type="text"
              {...register("city")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="street" className="block text-sm font-medium mb-1">
              町名・番地
            </label>
            <input
              id="street"
              type="text"
              {...register("street")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
            />
            {errors.street && (
              <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="building" className="block text-sm font-medium mb-1">
              建物名・部屋番号（任意）
            </label>
            <input
              id="building"
              type="text"
              {...register("building")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {success && (
            <p className="text-green-500 text-sm">{success}</p>
          )}

          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "更新中..." : "更新"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              キャンセル
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
}