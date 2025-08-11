"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserProfileForm from "@/components/mypage/UserProfileForm";
import AddressForm from "@/components/mypage/AddressForm";
import AccountDeletion from "@/components/mypage/AccountDeletion";
import { User, MapPin, UserMinus } from "lucide-react";

type TabType = "profile" | "address" | "delete";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">ログインが必要です</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            マイページを利用するにはログインしてください
          </p>
          <Button asChild>
            <a href="/register">ログイン・会員登録</a>
          </Button>
        </Card>
      </div>
    );
  }

  const tabs = [
    {
      id: "profile" as TabType,
      label: "ユーザー情報",
      icon: User,
    },
    {
      id: "address" as TabType,
      label: "住所情報",
      icon: MapPin,
    },
    {
      id: "delete" as TabType,
      label: "退会",
      icon: UserMinus,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">マイページ</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* サイドバー */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
              </div>
              
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <Icon size={18} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* メインコンテンツ */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && <UserProfileForm />}
            {activeTab === "address" && <AddressForm />}
            {activeTab === "delete" && <AccountDeletion />}
          </div>
        </div>
      </div>
    </div>
  );
}