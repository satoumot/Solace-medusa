import { RouteModule } from "../dashboard-app/types"
  import { CustomFeaturePage } from "../routes/custom"
//   import { CustomSettingsPage } from "../routes/custom-settings"

  export const routeModule: RouteModule = {
    routes: [
      {
        path: "/custom-page",
        Component: CustomFeaturePage
      },
    //   {
    //     path: "/settings/custom-settings",
    //     Component: CustomSettingsPage
    //   }
    ]
  }

  export default routeModule