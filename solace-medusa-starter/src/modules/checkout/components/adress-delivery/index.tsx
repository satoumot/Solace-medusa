'use client'

import React, { startTransition, useActionState } from 'react'
import { useEffect, useState } from 'react'

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'

import { cn } from '@lib/util/cn'
import { convertToLocale } from '@lib/util/money'
import ErrorMessage from '@modules/checkout/components/error-message'
import { RadioGroup } from '@headlessui/react'
import { setShippingMethod } from '@lib/data/cart'
import {
  RadioGroupIndicator,
  RadioGroupItem,
  RadioGroupRoot,
} from '@modules/common/components/radio'

import { initiatePaymentSession, setAddresses } from '@lib/data/cart'
import { useCheckoutForms } from '@lib/hooks/use-checkout-forms'
import compareAddresses from '@lib/util/addresses'
import { HttpTypes } from '@medusajs/types'
import { useToggleState } from '@medusajs/ui'
import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import Divider from '@modules/common/components/divider'
import { Heading } from '@modules/common/components/heading'
import { Stepper } from '@modules/common/components/stepper'
import { Text } from '@modules/common/components/text'
import { Spinner } from '@modules/common/icons'

import BillingAddress from '../billing_address'
import ShippingAddress from '../shipping-address'
import { SubmitButton } from '../submit-button'

const Addresses = ({
  cart,
  customer,
  availableShippingMethods
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null 
}) => {
  const searchParams = useSearchParams()
  const params = useParams()
  const router = useRouter()
  const pathname = usePathname()

  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const isOpen = searchParams.get('step') === 'address'

  const handleEdit = () => {
    router.push(pathname + '?step=address')
  }

  // const { state: sameAsShipping, toggle: originalToggleSameAsShipping } =
  //   useToggleState(
  //     cart?.shipping_address && cart?.billing_address
  //       ? compareAddresses(cart?.billing_address, cart?.shipping_address)
  //       : true
  //   )

  const selectedShippingMethod = availableShippingMethods?.find(
    // To do: remove the previously selected shipping method instead of using the last one
    (method) => method.id === cart.shipping_methods?.at(-1)?.shipping_option_id
  )
  const requiresAddress = selectedShippingMethod && (selectedShippingMethod.service_zone_id === 'serzo_01K4KTMQ0KT8EK90MNC1D9R2QD');

  const set = async (id: string) => {
    setIsLoading(true)
    await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  
  useEffect(() => {
    setError(null)
  }, [isOpen])  
  
  const initialValues = {
    shipping_address: cart?.shipping_address || {
      // first_name: '',
      // last_name: '',
      address_1: '',
      address_2: '',
      // company: '',
      postal_code: '',
      city: '',
      // country_code:
        // params.countryCode || cart?.shipping_address?.country_code || '',
      province: '',
      // phone: '',
    },
    // billing_address: cart?.billing_address || {
    //   first_name: '',
    //   last_name: '',
    //   address_1: '',
    //   company: '',
    //   postal_code: '',
    //   city: '',
    //   country_code: cart?.shipping_address?.country_code ?? '',
    //   province: '',
    //   phone: '',
    // },
    // email: cart?.email || customer?.email || '',
    // same_as_shipping: sameAsShipping,
  }

  const checkout = useCheckoutForms(initialValues)
  const [, formAction] = useActionState(setAddresses, null)

  // const toggleSameAsShipping = (value: boolean) => {
  //   originalToggleSameAsShipping()
  //   checkout.setFieldValue('same_as_shipping', value)
  // }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await checkout.handleSubmit()

      if (Object.keys(checkout.errors).length === 0) {
        const formData = new FormData()

        Object.entries(checkout.values.shipping_address).forEach(
          ([key, value]) => {
            formData.append(`shipping_address.${key}`, value as string)
          }
        )

        // Object.entries(checkout.values.billing_address).forEach(
        //   ([key, value]) => {
        //     formData.append(`billing_address.${key}`, value as string)
        //   }
        // )

        // formData.append('email', checkout.values.email)
        // formData.append(
        //   'same_as_shipping',
        //   checkout.values.same_as_shipping ? 'on' : 'off'
        // )

        const activeSession = cart?.payment_collection?.payment_sessions?.find(
          (paymentSession: any) => paymentSession.status === 'pending'
        )

        await Promise.all([
          startTransition(() => {
            formAction(formData)
          }),
          activeSession
            ? initiatePaymentSession(cart, {
                provider_id: activeSession.provider_id,
              })
            : Promise.resolve(),
        ])
        router.push(pathname + '?step=payment')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Box className="bg-primary p-5">
      <Box
        className={cn('flex flex-row items-center justify-between', {
          'mb-6': isOpen || (!isOpen && cart.shipping_methods?.length > 0),
        })}
      >
        <Heading
          as="h2"
          className={cn('flex flex-row items-center gap-x-4 text-2xl', {
            'pointer-events-none select-none':
              !isOpen && cart.shipping_methods?.length === 0,
          })}
        >
          {isOpen ? (
            <Stepper state="focussed">2</Stepper>
          ) : (
            <Stepper state="completed" />
          )}
          受け取り方法
        </Heading>
        {!isOpen &&
          cart?.shipping_address &&
          cart?.billing_address &&
          cart?.email && (
            <Button
              variant="tonal"
              size="sm"
              onClick={handleEdit}
              data-testid="edit-delivery-button"
            >
              編集
            </Button>
          )}
      </Box>
      {isOpen ? (
        // <Box data-testid="delivery-options-container">
          <form onSubmit={handleSubmit}>
            <RadioGroup value={selectedShippingMethod?.id || ''} onChange={set}>
              {availableShippingMethods?.map((option) => {
                return (
                  <RadioGroup.Option
                    key={option.id}
                    value={option.id}
                    data-testid="delivery-option-radio"
                    className={cn(
                      'flex cursor-pointer flex-row items-center justify-between gap-1 border p-2 !pr-4 text-basic-primary transition-all duration-200',
                      {
                        'border-action-primary':
                          option.id === selectedShippingMethod?.id,
                      }
                    )}
                  >
                    <Box className="flex w-full items-center gap-x-2">
                      <RadioGroupRoot className="m-3">
                        <RadioGroupItem
                          id={option.id}
                          value={option.id}
                          checked={option.id === selectedShippingMethod?.id}
                        >
                          <RadioGroupIndicator />
                        </RadioGroupItem>
                      </RadioGroupRoot>
                      <Box className="flex w-full flex-col gap-1 small:flex-row small:items-center small:justify-between">
                        <span className="text-lg">{option.name}</span>
                        <span className="justify-self-end text-md">
                          {convertToLocale({
                            amount: option.amount,
                            currency_code: cart?.currency_code,
                          })}
                        </span>
                      </Box>
                    </Box>
                  </RadioGroup.Option>
                )
              })}
            </RadioGroup>
            <ErrorMessage
              error={error}
              data-testid="delivery-option-error-message"
            />

            {requiresAddress && (
              <div className="mt-6">
                <Divider />
                <Heading as="h3" className="text-xl my-4">お届け先住所</Heading>
                <ShippingAddress
                  formik={checkout}
                  cart={cart}
                  customer={customer}
                  values={checkout.values}
                  handleChange={checkout.handleChange}
                  errors={checkout.errors}
                />
              </div>
            )}

            {/* 3. 統一された送信ボタン */}
            <SubmitButton
              className="mt-6 w-full bg-[#B8193F]　hover:bg-[#D6355D] active:bg-[#A11637]"
              isLoading={isLoading}
              disabled={!selectedShippingMethod}
            >
              支払い方法の選択に進む
            </SubmitButton>
            {/* </Box> */}
          </form>
      ) : (
        // ▼ ステップが閉じている時のサマリー表示
        <Box className="text-small-regular">
          {cart?.shipping_methods?.[0] ? (
            <div className="flex flex-col p-4">
              <Text size="lg" className="text-basic-primary">受け取り方法</Text>
              <Text className="text-secondary">{selectedShippingMethod?.name}</Text>
              <Text size="lg" className="text-basic-primary">配送先</Text>
              <Text className="text-secondary">
                {cart?.shipping_address?.postal_code}{' '}
                {cart?.shipping_address?.province}
              </Text>              
            </div>
          ) : null}
        </Box>
      )}
    </Box>
  )
}

export default Addresses
