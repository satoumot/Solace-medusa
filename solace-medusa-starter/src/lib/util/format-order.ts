export const getOrderStatus = (status: string) => {
  switch (status) {
    case 'pending':
      return '待機中'
    case 'completed':
      return 'Completed'
    case 'requires_action':
      return 'Requires Action'
    case 'canceled':
      return 'Canceled'
    default:
      break
  }
}

export const getFulfillmentStatus = (status: string) => {
  switch (status) {
    case 'not_fulfilled':
      return 'New'
    case 'fulfilled':
      return 'Pending'
    case 'requires_action':
      return 'Requires Action'
    case 'shipped':
      return 'Shipped'
    case 'delivered':
      return 'Delivered'
    default:
      break
  }
}
