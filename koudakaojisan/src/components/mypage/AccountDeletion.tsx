"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import { AlertTriangle } from "lucide-react";

const deleteAccountSchema = z.object({
  confirmText: z.string().refine(
    (val) => val === "退会します",
    "「退会します」と正確に入力してください"
  ),
  password: z.string().min(1, "パスワードを入力してください"),
});

type DeleteAccountFormData = z.infer<typeof deleteAccountSchema>;

export default function AccountDeletion() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState<string>("");
  const { user, logout, isLoading, setLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DeleteAccountFormData>();

  const onSubmit = async (data: DeleteAccountFormData) => {
    if (!user) return;

    try {
      setError("");
      setLoading(true);

      const response = await fetch(`/api/user/${user.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "退会処理に失敗しました");
      }

      logout();
      window.location.href = "/";
    } catch (err) {
      setError(err instanceof Error ? err.message : "退会処理に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    reset();
    setError("");
  };

  if (!user) return null;

  return (
    <Card className="p-6 border-red-200 dark:border-red-800">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="text-red-500" size={24} />
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
          アカウント削除
        </h2>
      </div>

      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
          注意事項
        </h3>
        <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
          <li>• アカウントを削除すると、すべてのデータが完全に削除されます</li>
          <li>• 削除されたデータは復元できません</li>
          <li>• 同じメールアドレスでの再登録は可能ですが、過去のデータは引き継がれません</li>
        </ul>
      </div>

      {!showConfirmation ? (
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            本当にアカウントを削除しますか？
          </p>
          <Button
            onClick={() => setShowConfirmation(true)}
            variant="destructive"
          >
            削除手続きに進む
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="confirmText" className="block text-sm font-medium mb-1">
              確認のため「退会します」と入力してください
            </label>
            <input
              id="confirmText"
              type="text"
              {...register("confirmText")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-800"
              placeholder="退会します"
            />
            {errors.confirmText && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmText.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              パスワードを入力してください
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-800"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="flex gap-2">
            <Button
              type="submit"
              variant="destructive"
              disabled={isLoading}
            >
              {isLoading ? "削除中..." : "アカウントを削除"}
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