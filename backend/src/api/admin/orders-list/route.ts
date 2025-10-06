import { getOrdersListWorkflow } from "@medusajs/core-flows"
import { HttpTypes, OrderDTO } from "@medusajs/framework/types"
import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"

// qだけの時
// export const GET = async (
//   req: AuthenticatedMedusaRequest<HttpTypes.AdminOrderFilters>,
//   res: MedusaResponse<HttpTypes.AdminOrderListResponse>
// ) => {
//   // 1. バリデーション済みのフィルターから 'q' とそれ以外を分割して取得します
//   const { q, ...restOfFilters } = req.filterableFields

//   // 2. 'q' 以外のフィルターを準備します
//   const filters: Record<string, any> = {
//     ...restOfFilters,
//     is_draft_order: false,
//   }

//   // 3. もし 'q' パラメータが存在すれば、それを email 検索の条件として設定します
//   if (q) {
//     // 'ilike' を使い、部分一致かつ大文字小文字を区別しない検索にします
//     filters.items = { title: { $ilike: `%${q}%` }}
//   }

//   // 4. 最終的なフィルター条件を組み立てます
//   //    (この時点で 'q' は filters オブジェクトから取り除かれています)
//   const variables = {
//     filters,
//     ...req.queryConfig.pagination,
//   }

//   // 5. ワークフローを実行します
//   const workflow = getOrdersListWorkflow(req.scope)
//   const { result } = await workflow.run({
//     input: {
//       fields: req.queryConfig.fields,
//       variables,
//     },
//   })

//   const { rows, metadata } = result as {
//     rows: OrderDTO[]
//     metadata: any
//   }
//   res.json({
//     orders: rows as unknown as HttpTypes.AdminOrder[],
//     count: metadata.count,
//     offset: metadata.skip,
//     limit: metadata.take,
//   })
// }

// qとsnd_qの時
export const GET = async (
  req: AuthenticatedMedusaRequest<HttpTypes.AdminOrderFilters>,
  res: MedusaResponse<HttpTypes.AdminOrderListResponse>
) => {
  // 1. バリデーション済みのフィルターから 'q', 'snd_q' を取り出す
  const { q, snd_q, ...restOfFilters } = req.filterableFields

  const filters: Record<string, any> = {
    ...restOfFilters,
    is_draft_order: false,
  }

  // AND条件を格納するための配列を準備
  const andConditions = []

  // 2. 'q' があれば、注文情報を検索するOR条件を作成
  if (q) {
    const isQNumeric = /^\d+$/.test(q)
    const qOrConditions: Record<string, any>[] = []
    qOrConditions.push({ email: { $ilike: `%${q}%` } })
    if (isQNumeric) {
      qOrConditions.push({ display_id: parseInt(q, 10) })
    }
    andConditions.push({ $or: qOrConditions })
  }

  // 3. 'snd_q' があれば、顧客名を検索するOR条件を作成
  if (snd_q) {
    const sndQOrConditions: Record<string, any>[] = []
    // 顧客(customer)リレーション先の first_name と last_name を検索
    sndQOrConditions.push({ shipping_address: { first_name: { $ilike: `%${snd_q}%` } } })
    sndQOrConditions.push({ shipping_address: { last_name: { $ilike: `%${snd_q}%` } } })
    andConditions.push({ $or: sndQOrConditions })
  }

  // 4. 組み立てたAND条件をフィルターに設定
  // クエリ同士をOR検索をしたい場合は filters.$or を利用する
  if (andConditions.length > 0) {
    filters.$and = andConditions
  }

    // 5. 最終的なフィルター条件を組み立てます
  const variables = {
    filters: filters as any,
    ...req.queryConfig.pagination,
  }

  const workflow = getOrdersListWorkflow(req.scope)
  const { result } = await workflow.run({
    input: {
      fields: req.queryConfig.fields,
      variables,
    },
  })

  const { rows, metadata } = result as {
    rows: OrderDTO[]
    metadata: any
  }
  res.json({
    orders: rows as unknown as HttpTypes.AdminOrder[],
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}