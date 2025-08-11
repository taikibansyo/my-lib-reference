import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const addressSchema = z.object({
  postalCode: z.string().regex(/^\d{3}-\d{4}$/),
  prefecture: z.string().min(1),
  city: z.string().min(1),
  street: z.string().min(1),
  building: z.string().optional(),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const address = addressSchema.parse(body);
    const { id: userId } = await params;

    // TODO: データベース接続を実装
    // 現在はモックレスポンス
    const user = {
      id: userId,
      name: "テストユーザー",
      email: "test@example.com",
      address,
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