import validator from 'validator'
import * as Yup from 'yup'

export type ValidationError = {
  field: string
  message: string
}

export const validatePhoneNumber = (number) => {
  const isValidPhoneNumber = validator.isMobilePhone(number)
  return isValidPhoneNumber
}

export const validatePassword = (password: string): string[] => {
  const unmetRequirements: string[] = []

  if (password.length < 8) {
    unmetRequirements.push('最低８文字です')
  }
  if (!/[a-z]/.test(password)) {
    unmetRequirements.push('小文字が必要です')
  }
  if (!/[A-Z]/.test(password)) {
    unmetRequirements.push('大文字が必要です')
  }
  if (
    !/[0-9]/.test(password) &&
    !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  ) {
    unmetRequirements.push('数字か記号が必要です')
  }

  return unmetRequirements
}

const billingFormValidationSchema = Yup.object({
  first_name: Yup.string().required('入力してください first name'),
  last_name: Yup.string().required('入力してください last name'),
  address_1: Yup.string().required('入力してください address'),
  city: Yup.string().required('入力してください city'),
  country_code: Yup.string().required('Please select country'),
  postal_code: Yup.string().required('入力してください postal code'),
  phone: Yup.number().required('入力してください phone number'),
})

export const checkoutFormValidationSchema = Yup.object({
  shipping_address: Yup.object({
    first_name: Yup.string().required('入力してください first name'),
    last_name: Yup.string().required('入力してください last name'),
    address_1: Yup.string().required('入力してください address'),
    city: Yup.string().required('入力してください city'),
    country_code: Yup.string().required('Please select country'),
    postal_code: Yup.string().required('入力してください postal code'),
    phone: Yup.number()
      .required('入力してください phone number')
      .typeError('Phone number must contain only digits'),
  }),
  billing_address: Yup.object().when('same_as_shipping', {
    is: false,
    then: () => billingFormValidationSchema,
    otherwise: () => Yup.object().notRequired(),
  }),
  email: Yup.string()
    .email('Invalid email address')
    .required('入力してください email'),
  same_as_shipping: Yup.boolean(),
})

export const userShippingAddressFormValidationSchema = Yup.object({
  first_name: Yup.string().required('入力してください first name'),
  last_name: Yup.string().required('入力してください last name'),
  address_1: Yup.string().required('入力してください address'),
  city: Yup.string().required('入力してください city'),
  country_code: Yup.string().required('Please select country'),
  postal_code: Yup.string().required('入力してください postal code'),
  phone: Yup.number()
    .required('入力してください phone number')
    .typeError('Phone number must contain only digits'),
  company: Yup.string().optional(),
  is_default_shipping: Yup.boolean().optional(),
  province: Yup.string().optional(),
})
