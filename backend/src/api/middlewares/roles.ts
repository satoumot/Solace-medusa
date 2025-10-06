import type { MedusaRequest, MedusaResponse, MedusaNextFunction } from "@medusajs/framework/http"
import { Pool } from "pg"

// Authorization: Bearer <JWT> を自前デコードして user_id を取得
function getUserIdFromAuthHeader(req: MedusaRequest): string | undefined {
  const auth = req.headers.authorization
  if (!auth?.startsWith("Bearer ")) return
  const token = auth.substring("Bearer ".length)
  const parts = token.split(".")
  if (parts.length < 2) return
  try {
    const payloadJson = Buffer.from(parts[1].replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8")
    const payload = JSON.parse(payloadJson)
    return payload?.app_metadata?.user_id || payload?.actor_id
  } catch {
    return
  }
}

// JWTデコードフォールバック
async function getUserId(req: MedusaRequest): Promise<string | undefined> {
  const anyReq = req as any
  return (
    anyReq?.auth?.actor_id ||
    anyReq?.user?.id ||
    anyReq?.app_metadata?.user_id ||
    getUserIdFromAuthHeader(req)
  )
}

// 実DBスキーマで権限グループを取得
async function getUserGroup(userId: string): Promise<"admin" | "general" | null> {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  try {
    const { rows } = await pool.query(
      `SELECT pg.code AS code
       FROM user_permission up
       JOIN permission_group pg ON pg.code = up.group_code
       WHERE up.user_id = $1
       LIMIT 1`,
      [userId]
    )
    return (rows?.[0]?.code as "admin" | "general" | undefined) ?? null
  } finally {
    await pool.end()
  }
}

// 管理者のみ許可するミドルウェア
export async function requireAdmin(
  req: MedusaRequest,
  res: MedusaResponse,
  next: MedusaNextFunction
) {
  const userId = await getUserId(req)
  if (!userId) {
    return res.status(401).json({ message: "unauthorized" })
  }
  const group = await getUserGroup(userId)
  if (group !== "admin") {
    return res.status(403).json({ message: "forbidden" })
  }
  next()
}