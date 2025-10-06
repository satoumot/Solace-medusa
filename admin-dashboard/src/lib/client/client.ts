import Medusa from "@medusajs/js-sdk"

export const backendUrl = __BACKEND_URL__ ?? "/"

// SDKをJWTモードに変更
// - loginで保存した token を毎回 Authorization: Bearer に付ける
export const sdk = new Medusa({
  baseUrl: backendUrl,
  auth: {
    type: "jwt",
    token: async () => localStorage.getItem("admin_token") ?? "",
  },
})

// コンソールから試すとき用
if (typeof window !== "undefined") {
  ;(window as any).__sdk = sdk
}