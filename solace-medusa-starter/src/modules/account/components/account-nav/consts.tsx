import {
  BoxIcon,
  DashboardIcon,
  LogoutIcon,
  SettingsIcon,
  ShippingIcon,
} from '@modules/common/icons'

export const profileNavItemsGroups = [
  [
    {
      href: '/account',
      icon: <DashboardIcon className="h-6 w-6" />,
      label: 'マイページ',
      type: 'link',
    },
    {
      href: '/account/orders',
      icon: <BoxIcon className="h-6 w-6" />,
      label: '注文履歴',
      type: 'link',
    },
    // {
    //   href: '/account/addresses',
    //   icon: <ShippingIcon className="h-6 w-6" />,
    //   label: 'Shipping details',
    //   type: 'link',
    // },
    {
      href: '/account/profile',
      icon: <SettingsIcon className="h-6 w-6" />,
      label: 'アカウント設定',
      type: 'link',
    },
  ],
  [
    {
      href: '',
      type: 'logout',
      icon: <LogoutIcon className="h-6 w-6" />,
      label: 'ログアウト',
    },
  ],
]
