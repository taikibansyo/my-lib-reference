import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const updateUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
});

const deleteUserSchema = z.object({
  password: z.string().min(1),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { name, email, phone } = updateUserSchema.parse(body);
    const { id: userId } = await params;

    // TODO: データベース接続を実装
    // 現在はモックレスポンス
    const user = {
      id: userId,
      name,
      email,
      phone: phone || undefined,
    };

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "入力データが不正です", errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { password } = deleteUserSchema.parse(body);
    const { id: userId } = await params;

    // TODO: パスワード検証とデータベース削除を実装
    // 現在はモックレスポンス
    if (password !== "password") {
      return NextResponse.json(
        { message: "パスワードが正しくありません" },
        { status: 401 }
      );
    }

    return NextResponse.json({ message: "アカウントが削除されました" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "入力データが不正です", errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}