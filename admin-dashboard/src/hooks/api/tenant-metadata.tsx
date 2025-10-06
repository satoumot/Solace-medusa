import { useQuery } from "@tanstack/react-query"
import { sdk } from "../../lib/client"

/**
 * テナントメタデータ（教科名/先生名）の選択肢を取得するフック
 * - 管理API: GET /admin/tenant-metadata/options を叩いてユニーク一覧を取得
 * - フィルタのセレクト候補として利用
 */
type OptionsResponse = { subjects: string[]; teachers: string[] }

export const useTenantMetadataOptions = () => {
  return useQuery({
    queryKey: ["tenant_metadata_options"],
    queryFn: async () => {
      const data = (await sdk.client.fetch("admin/tenant-metadata/options")) as OptionsResponse
      return data
    },
  })
}