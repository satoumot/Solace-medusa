import { useQuery } from "@tanstack/react-query"
import { sdk } from "../../lib/client"

type MePerms = { group: "admin" | "general" }

// 現在ユーザーの権限を取得（Authorization は JWT を付与）
export const useMePermissions = () => {
  return useQuery({
    queryKey: ["me_permissions"],
    queryFn: async () => {
      const token = localStorage.getItem("admin_token") ?? ""
      return (await sdk.client.fetch("admin/me/permissions", {
        headers: { Authorization: `Bearer ${token}` },
      })) as MePerms
    },
  })
}