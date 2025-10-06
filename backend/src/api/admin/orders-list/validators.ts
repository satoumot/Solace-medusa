import { z, ZodEffects, ZodNullable, ZodObject, ZodOptional } from "zod"
// import { AddressPayload } from "../../utils/common-validators"
// import {
//   createFindParams,
//   createOperatorMap,
//   createSelectParams,
//   WithAdditionalData,
// } from "../../utils/validators"

// utilsを作らずに進めるのでここで定義（コピー）
export const AddressPayload = z
  .object({
    first_name: z.string().nullish(),
    last_name: z.string().nullish(),
    phone: z.string().nullish(),
    company: z.string().nullish(),
    address_1: z.string().nullish(),
    address_2: z.string().nullish(),
    city: z.string().nullish(),
    country_code: z.string().nullish(),
    province: z.string().nullish(),
    postal_code: z.string().nullish(),
    metadata: z.record(z.unknown()).nullish(),
  })
  .strict()

export const createSelectParams = () => {
  return z.object({
    fields: z.string().optional(),
  })
}

export const WithAdditionalData = <T extends ZodObject<any, any>>(
  originalSchema: T,
  modifyCallback?: (schema: T) => ZodObject<any, any> | ZodEffects<any, any>
) => {
  return (
    additionalDataValidator?: ZodOptional<ZodNullable<ZodObject<any, any>>>
  ) => {
    let schema: ZodObject<any, any>

    if (!additionalDataValidator) {
      schema = originalSchema.extend({
        additional_data: z.record(z.unknown()).nullish(),
      })
    } else {
      schema = originalSchema.extend({
        additional_data: additionalDataValidator,
      })
    }

    return modifyCallback ? modifyCallback(schema as T) : schema
  }
}

export const createFindParams = ({
  offset,
  limit,
  order,
}: {
  offset?: number
  limit?: number
  order?: string
} = {}) => {
  const selectParams = createSelectParams()

  return selectParams.merge(
    z.object({
      offset: z.preprocess(
        (val) => {
          if (val && typeof val === "string") {
            return parseInt(val)
          }
          return val
        },
        z
          .number()
          .optional()
          .default(offset ?? 0)
      ),
      limit: z.preprocess(
        (val) => {
          if (val && typeof val === "string") {
            return parseInt(val)
          }
          return val
        },
        z
          .number()
          .optional()
          .default(limit ?? 20)
      ),
      order: order
        ? z.string().optional().default(order)
        : z.string().optional(),
      with_deleted: z.preprocess((val) => {
        if (val && typeof val === "string") {
          return val === "true" ? true : val === "false" ? false : val
        }
        return val
      }, z.boolean().optional()),
    })
  )
}

export const createOperatorMap = (
  type?: z.ZodType,
  valueParser?: (val: any) => any
) => {
  if (!type) {
    type = z.string()
  }

  let simpleType: any = type.optional()
  if (valueParser) {
    simpleType = z.preprocess(valueParser, type).optional()
  }

  const arrayType: any = z.array(type).optional()
  const unionType: any = z.union([simpleType, arrayType]).optional()

  return z.union([
    unionType,
    z.object({
      $eq: unionType,
      $ne: unionType,
      $in: arrayType,
      $nin: arrayType,
      $like: simpleType,
      $ilike: simpleType,
      $re: simpleType,
      $contains: simpleType,
      $gt: simpleType,
      $gte: simpleType,
      $lt: simpleType,
      $lte: simpleType,
    }),
  ])
}
// ここまでコピーした定義

export const AdminGetOrdersOrderParams = createSelectParams().merge(
  z.object({
    id: z.union([z.string(), z.array(z.string())]).optional(),
    status: z.union([z.string(), z.array(z.string())]).optional(),
    version: z.number().optional(),
    created_at: createOperatorMap().optional(),
    updated_at: createOperatorMap().optional(),
    deleted_at: createOperatorMap().optional(),
  })
)

export type AdminGetOrdersOrderParamsType = z.infer<
  typeof AdminGetOrdersOrderParams
>

export const AdminGetOrdersOrderItemsParams = createSelectParams().merge(
  z.object({
    id: z.union([z.string(), z.array(z.string())]).optional(),
    item_id: z.union([z.string(), z.array(z.string())]).optional(),
    version: z.number().optional(),
  })
)

export type AdminGetOrdersOrderItemsParamsType = z.infer<
  typeof AdminGetOrdersOrderParams
>

export const AdminGetOrderShippingOptionList = z.object({})

export type AdminGetOrderShippingOptionListType = z.infer<
  typeof AdminGetOrderShippingOptionList
>

/**
 * Parameters used to filter and configure the pagination of the retrieved order.
 */
export const AdminGetOrdersParams = createFindParams({
  limit: 15,
  offset: 0,
}).merge(
  z.object({
    id: z
      .union([z.string(), z.array(z.string()), createOperatorMap()])
      .optional(),
    status: z
      .union([z.string(), z.array(z.string()), createOperatorMap()])
      .optional(),
    name: z.union([z.string(), z.array(z.string())]).optional(),
    sales_channel_id: z.array(z.string()).optional(),
    region_id: z.union([z.string(), z.array(z.string())]).optional(),
    customer_id: z.union([z.string(), z.array(z.string())]).optional(),
    q: z.string().optional(),
    snd_q: z.string().optional(), //snd_qを追加
    created_at: createOperatorMap().optional(),
    updated_at: createOperatorMap().optional(),
  })
)

export type AdminGetOrdersParamsType = z.infer<typeof AdminGetOrdersParams>

export const AdminCompleteOrder = WithAdditionalData(z.object({}))

const Item = z.object({
  id: z.string(),
  quantity: z.number(),
})

export type AdminOrderCreateFulfillmentType = z.infer<
  typeof OrderCreateFulfillment
>
export const OrderCreateFulfillment = z.object({
  items: z.array(Item).min(1),
  location_id: z.string().nullish(),
  shipping_option_id: z.string().optional(),
  no_notification: z.boolean().optional(),
  metadata: z.record(z.unknown()).nullish(),
})
export const AdminOrderCreateFulfillment = WithAdditionalData(
  OrderCreateFulfillment
)

const Label = z.object({
  tracking_number: z.string(),
  tracking_url: z.string(),
  label_url: z.string(),
})

export type AdminOrderCreateShipmentType = z.infer<typeof OrderCreateShipment>
export const OrderCreateShipment = z.object({
  items: z.array(Item),
  labels: z.array(Label).optional(),
  no_notification: z.boolean().optional(),
  metadata: z.record(z.unknown()).nullish(),
})
export const AdminOrderCreateShipment = WithAdditionalData(OrderCreateShipment)

export type AdminOrderCancelFulfillmentType = z.infer<
  typeof OrderCancelFulfillment
>
export const OrderCancelFulfillment = z.object({
  no_notification: z.boolean().optional(),
})
export const AdminOrderCancelFulfillment = WithAdditionalData(
  OrderCancelFulfillment
)

export const AdminOrderChangesParams = createSelectParams().merge(
  z.object({
    id: z.union([z.string(), z.array(z.string())]).optional(),
    status: z.union([z.string(), z.array(z.string())]).optional(),
    change_type: z.union([z.string(), z.array(z.string())]).optional(),
    created_at: createOperatorMap().optional(),
    updated_at: createOperatorMap().optional(),
    deleted_at: createOperatorMap().optional(),
  })
)

export type AdminOrderChangesType = z.infer<typeof AdminOrderChangesParams>

export type AdminMarkOrderFulfillmentDeliveredType = z.infer<
  typeof AdminMarkOrderFulfillmentDelivered
>

export const AdminMarkOrderFulfillmentDelivered = z.object({})

export type AdminTransferOrderType = z.infer<typeof AdminTransferOrder>
export const AdminTransferOrder = z.object({
  customer_id: z.string(),
  description: z.string().optional(),
  internal_note: z.string().optional(),
})

export type AdminCancelOrderTransferRequestType = z.infer<
  typeof AdminCancelOrderTransferRequest
>
export const AdminCancelOrderTransferRequest = z.object({})

export type AdminUpdateOrderType = z.infer<typeof AdminUpdateOrder>
export const AdminUpdateOrder = z.object({
  email: z.string().optional(),
  shipping_address: AddressPayload.optional(),
  billing_address: AddressPayload.optional(),
  metadata: z.record(z.unknown()).nullish(),
})

export type AdminCreateOrderCreditLinesType = z.infer<
  typeof AdminCreateOrderCreditLines
>
export const AdminCreateOrderCreditLines = z.object({
  amount: z.number(),
  reference: z.string(),
  reference_id: z.string(),
  metadata: z.record(z.unknown()).nullish(),
})