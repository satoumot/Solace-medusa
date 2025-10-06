import { MenuItemModule } from "../dashboard-app/types"
import { Typescript } from "@medusajs/icons"

export const menuItemModule: MenuItemModule = {
  menuItems: [
    {
      label: "カスタム機能",
      path: "/custom-page",
      icon: Typescript
    },
    // {
    //   label: "設定項目",
    //   path: "/settings/custom-settings"
    // }
  ]
}

export default menuItemModule