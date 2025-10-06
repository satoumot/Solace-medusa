import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Pool } from "pg"

/**
 * 管理用カスタム一覧エンドポイント
 * - tenant_metadata の教科名/先生名で一致する product_id 群を求め、
 *   Medusa の Product モジュールに id フィルタとして渡して商品一覧を返す。
 *
 * 受け付ける主なクエリ:
 * - tenant_subject: string | string[] （教科名）
 * - tenant_teacher: string | string[] （先生名）
 * - limit, offset: ページネーション（config 側の take/skip に変換）
 * - created_at/updated_at, collection_id, is_giftcard, type_id, status, category_id, tag_id:
 *   Product モジュールのフィルタ（対応する形にマッピング）
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const {
    tenant_subject,
    tenant_teacher,
    limit,
    offset,
    created_at,
    updated_at,
    category_id,
    collection_id,
    is_giftcard,
    tag_id,
    type_id,
    status,
  } = req.query as any

  // 毎リクエストで簡易に Pool を生成・破棄（必要に応じて共有プール化も検討可）
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  let productIds: string[] | undefined

  try {
    // 教科/先生が指定されている場合のみ tenant_metadata を検索
    if (tenant_subject || tenant_teacher) {
      const values: any[] = []
      const conds: string[] = []
      if (tenant_subject) {
        // ANY() で複数選択に対応
        conds.push(`subject_name = ANY($${values.length + 1})`)
        values.push(String(tenant_subject).split(","))
      }
      if (tenant_teacher) {
        conds.push(`teacher_name = ANY($${values.length + 1})`)
        values.push(String(tenant_teacher).split(","))
      }

      // 教科/先生に一致する product_id を重複排除で取得
      const { rows } = await pool.query(
        `SELECT DISTINCT product_id FROM tenant_metadata WHERE ${
          conds.length ? conds.join(" AND ") : "TRUE"
        }`,
        values
      )
      productIds = rows.map((r) => r.product_id)
      // ヒットなしなら空結果を即返す
      if (!productIds.length) {
        return res.json({ products: [], count: 0 })
      }
    }
  } finally {
    await pool.end()
  }

  // Medusa の Product モジュールサービスを解決
  const product = req.scope.resolve("product")

  // Product モジュールに渡す filters を組み立て（未定義は含めない）
  const filters: any = {}
  if (productIds?.length) {
    // id は単一なら文字列、複数なら配列で渡す
    filters.id = productIds.length === 1 ? productIds[0] : productIds
  }
  if (created_at) filters.created_at = JSON.parse(created_at)
  if (updated_at) filters.updated_at = JSON.parse(updated_at)
  if (collection_id) filters.collection_id = String(collection_id).split(",")
  if (typeof is_giftcard === "string") filters.is_giftcard = is_giftcard === "true"
  if (type_id) filters.type_id = String(type_id).split(",")
  if (status) filters.status = String(status).split(",")
  // category_id / tag_id は所定の入れ子構造に変換
  if (category_id) filters.categories = { id: String(category_id).split(",") }
  if (tag_id) filters.tags = { id: String(tag_id).split(",") }

  // ページネーションなどは config 側で指定
  const config: any = {
    take: limit ? Number(limit) : 20,
    skip: offset ? Number(offset) : 0,
  }

  // 一覧＋総数を取得
  const [products, count] = await product.listAndCountProducts(filters, config)
  return res.json({ products, count })
}