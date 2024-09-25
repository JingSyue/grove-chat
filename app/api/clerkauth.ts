// app/api/clerkauth.ts
import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@clerk/nextjs/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // 1. 使用 getAuth 來檢查當前請求的用戶認證狀態
  const { userId, sessionId } = auth();

  // 2. 檢查是否有 userId
  if (!userId) {
    return res.status(401).json({ message: "未登入" });
  }

  // 3. 返回用戶登入狀態
  return res.status(200).json({ message: "用戶已登入", userId, sessionId });
}
