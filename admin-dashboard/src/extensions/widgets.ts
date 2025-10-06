import { WidgetModule } from "../dashboard-app/types"
  import { CustomWidget } from "../widgets/custom-widget"
  // 他のウィジェットをここにインポート

  export const widgetModule: WidgetModule = {
    widgets: [
      {
        Component: CustomWidget,
        zone: ["product.details.after"] // 挿入したいゾーン
      },
      // 他のウィジェットをここに追加
    ]
  }

  export default widgetModule