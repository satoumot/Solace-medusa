import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Pool } from "pg"

// Authorization: Bearer <JWT> を自前デコード（認証ミドルウェアが無い/落ちた場合のフォールバック）
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

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const anyReq = req as any
  const userId =
    anyReq?.auth?.actor_id ||       // 認証ミドルウェアが入る通常パス
    anyReq?.user?.id ||
    anyReq?.app_metadata?.user_id ||
    getUserIdFromAuthHeader(req)     // フォールバック

  if (!userId) {
    return res.status(401).json({ message: "unauthorized" })
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  try {
    // 実DBスキーマ（permission_group.code / user_permission.group_code）に合わせて判定
    const { rows } = await pool.query(
      `SELECT COALESCE(pg.code, 'general') AS "group"
       FROM (SELECT $1::text AS user_id) u
       LEFT JOIN user_permission up ON up.user_id = u.user_id
       LEFT JOIN permission_group pg ON pg.code = up.group_code
       LIMIT 1`,
      [userId]
    )
    const group = (rows?.[0]?.group as "admin" | "general" | undefined) ?? "general"
    return res.json({ group })
  } finally {
    await pool.end()
  }
}