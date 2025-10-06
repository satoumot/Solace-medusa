import { defineMiddlewares, authenticate } from "@medusajs/framework/http"
import { requireAdmin } from "./middlewares/roles"
import { adminOrderRoutesMiddlewares } from "./admin/orders-list/middlewares"
import { storeSearchRoutesMiddlewares } from "./store/search/middlewares"

export default defineMiddlewares({
  routes: [
    // 認証ミドルウェアをカスタムAPIに適用（session/bearer の両方を許可）
    {
      matcher: "/admin/me/permissions",
      middlewares: [authenticate("user", ["session", "bearer"])],
    },
    // 商品の書き込みは管理者のみ許可
    // - 先に authenticate でユーザー特定（JWT/セッション両対応）
    // - 続けて requireAdmin でグループ判定
    {
      matcher: "/admin/products*",
      method: ["POST", "PUT", "DELETE"],
      middlewares: [authenticate("user", ["session", "bearer"]), requireAdmin],
    },
    ...adminOrderRoutesMiddlewares, //Gitから持ってきたミドルウェアを追加している
    ...storeSearchRoutesMiddlewares, //サーチのミドルウェアを追加（Solace）
  ],
})