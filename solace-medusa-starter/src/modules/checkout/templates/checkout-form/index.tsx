import { listCartShippingMethods } from '@lib/data/fulfillment'
import { listCartPaymentMethods } from '@lib/data/payment'
import { HttpTypes } from '@medusajs/types'
import Addresses from '@modules/checkout/components/addresses'
import Payment from '@modules/checkout/components/payment'
import Shipping from '@modules/checkout/components/shipping'
import Common from '@modules/checkout/components/common-info'
import { Box } from '@modules/common/components/box'
import ShippingAddress from '@modules/checkout/components/shipping-address'

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  if (!cart) {
    return null
  }

  const shippingMethods = await listCartShippingMethods(cart.id)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? '')
//   const paymentMethods = [
//   {
//     id: 'クレジットカード決済',
//     provider_id: 'sbps-creditcard',
//     title: 'クレジットカード決済'
//   },
//   {
//     id: 'コンビニ払い',
//     provider_id: 'sbps-konbini',
//     title: 'コンビニ払い'
//   },
//   {
//     id: '店頭で決済',
//     provider_id: 'store-payment',
//     title: '店頭で決済'
//   },
//  {
//     id: '請求書払い',
//     provider_id: 'invoice-payment',
//     title: '請求書払い'
//   },
//   {
//     id: '代金引換',
//     provider_id: 'invoice-payment',
//     title: '代金引換'
//   },
// ];

  if (!shippingMethods || !paymentMethods) {
    return null
  }

  return (
    <Box className="grid w-full grid-cols-1 gap-y-4">
      <Addresses cart={cart} customer={customer} /> 
      <Shipping cart={cart} availableShippingMethods={shippingMethods} />
      {/* <Common cart={cart} customer={customer} />
      <ShippingAddress cart={cart} customer={customer} availableShippingMethods={shippingMethods} /> */}
      <Payment cart={cart} availablePaymentMethods={paymentMethods} /> 
    </Box>
  )
}
