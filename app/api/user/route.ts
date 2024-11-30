import prisma from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();

    // usersテーブルにデータ挿入
    await prisma.users.create({
      data: {
        email: data.email,
        username: data.username,
        password: data.hashedPassword,
      },
    });

    return NextResponse.json({ message: "ユーザー登録完了" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "ユーザー登録失敗", error }, { status: 500 });
  }
};
