import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Pool } from "pg"

/**
 * 管理用: フィルタ選択肢の供給エンドポイント
 * - tenant_metadata から教科名/先生名のユニーク一覧を返す
 * - 管理画面の Add filter セレクトの候補に利用
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  try {
    const { rows: subjectRows } = await pool.query(
      `SELECT DISTINCT subject_name AS value FROM tenant_metadata ORDER BY subject_name`
    )
    const { rows: teacherRows } = await pool.query(
      `SELECT DISTINCT teacher_name AS value FROM tenant_metadata ORDER BY teacher_name`
    )

    res.json({
      subjects: subjectRows.map((r) => r.value),
      teachers: teacherRows.map((r) => r.value),
    })
  } finally {
    await pool.end()
  }
}