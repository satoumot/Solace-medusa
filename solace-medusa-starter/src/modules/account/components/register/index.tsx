'use client'

import { startTransition, useActionState, useEffect, useState } from 'react'

import { passwordRequirements } from '@lib/constants'
import { signup } from '@lib/data/customer'
import { cn } from '@lib/util/cn'
import { validatePassword, ValidationError } from '@lib/util/validator'
import { LOGIN_VIEW } from '@modules/account/templates/login-template'
import ErrorMessage from '@modules/checkout/components/error-message'
import { SubmitButton } from '@modules/checkout/components/submit-button'
import { Box } from '@modules/common/components/box'
import { Checkbox } from '@modules/common/components/checkbox'
import { Heading } from '@modules/common/components/heading'
import { Input } from '@modules/common/components/input'
import { Label } from '@modules/common/components/label'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { toast } from '@modules/common/components/toast'
import { CheckCircleIcon, XCircleIcon } from '@modules/common/icons'

import LoginPrompt from './login-prompt'

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [isReadAgreements, setIsReadAgreements] = useState(false)
  const [localMessage, setLocalMessage] = useState(null)
  const [message, formAction] = useActionState(signup, null)
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const errors: ValidationError[] = []

    // Check if all required fields are filled
    const requiredFields = ['first_name', 'last_name', 'email', 'password', 'collegeCD']
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        errors.push({
          field,
          message: '入力してください',
        })
      }
    }

    // if (!isReadAgreements) {
    //   errors.push({
    //     field: 'is_read_agreements',
    //     message: 'Please agree to Terms & Conditions and Privacy Policy',
    //   })
    // }

    // Check password requirements
    const password = formData.get('password') as string
    const isPasswordValid = validatePassword(password)

    if (isPasswordValid.length > 0) {
      isPasswordValid.forEach((requirement) => {
        errors.push({
          field: 'password',
          message: requirement,
        })
      })
    }

    if (errors.length > 0) {
      setValidationErrors(errors)
      return
    }

    setValidationErrors([])
    startTransition(() => {
      formAction(formData)
    })
  }

  // Clear message
  useEffect(() => {
    if (message) {
      setLocalMessage(message)
      startTransition(() => {
        formAction(new FormData())
      })
    }
  }, [message, formAction])

  // Display error toast
  useEffect(() => {
    if (localMessage) {
      if (localMessage.includes('Identity with email already exists')) {
        toast(
          'error',
          'そのメールアドレスは既に使われているため、ログインしてください'
        )
      } else if (localMessage.includes('Password should be a string')) {
        return
      } else {
        toast('error', localMessage)
      }
      setLocalMessage(null)
    }
  }, [localMessage])

  return (
    <Box
      className="flex w-full flex-col items-center gap-6"
      data-testid="register-page"
    >
      <Box className="flex w-full flex-col gap-6 bg-primary p-4 small:p-5">
        <Heading as="h2" className="text-xl small:text-2xl">
          新規会員登録
        </Heading>
        <form className="flex w-full flex-col" onSubmit={handleSubmit}>
          <Box className="flex w-full flex-col gap-y-4">
            <Box className="grid grid-cols-1 gap-4 small:grid-cols-2">

              <Input
                label="苗字"
                name="last_name"
                required
                autoComplete="family-name"
                error={
                  validationErrors.find((error) => error.field === 'last_name')
                    ?.message
                }
                data-testid="last-name-input"
              />
              <Input
                label="名前"
                name="first_name"
                required
                autoComplete="given-name"
                error={
                  validationErrors.find((error) => error.field === 'first_name')
                    ?.message
                }
                data-testid="first-name-input"
              />
            </Box>
            <Box className="grid grid-cols-1 gap-4 small:grid-cols-2">
              <Input
                label="メールアドレス"
                name="email"
                required
                type="email"
                autoComplete="email"
                error={
                  validationErrors.find((error) => error.field === 'email')
                    ?.message
                }
                data-testid="email-input"
              />
              <Input
                label="大学CD"
                name="collegeCD"
                type="text"
                autoComplete="off"
                error={
                  validationErrors.find((error) => error.field === 'email')
                    ?.message
                }
                data-testid="phone-input"
                
              />
            </Box>
            <Input
              label="パスワード"
              name="password"
              required
              type="password"
              autoComplete="new-password"
              error={
                validationErrors.find((error) => error.field === 'password')
                  ?.message
              }
              data-testid="password-input"
            />
            <Box className="flex flex-col gap-y-2 border border-basic-primary p-4">
              {passwordRequirements.map((item, id) => {
                const isValid = !validationErrors.some(
                  (error) => error.message === item
                )

                return (
                  <Box
                    key={id}
                    className={cn('flex items-center gap-2 text-secondary', {
                      'border-negative': !isValid,
                    })}
                  >
                    {isValid ? (
                      <CheckCircleIcon />
                    ) : (
                      <XCircleIcon className="text-negative" />
                    )}
                    <Label
                      size="sm"
                      className={cn({ 'text-negative': !isValid })}
                    >
                      {item}
                    </Label>
                  </Box>
                )
              })}
            </Box>
          </Box>
          {/* <Box className="mt-6 flex items-center gap-x-2">
            <Checkbox
              id="is_read_agreements"
              name="is_read_agreements"
              checked={isReadAgreements}
              onChange={() => setIsReadAgreements(!isReadAgreements)}
              className={cn({
                'border-negative': validationErrors.find(
                  (error) => error.field === 'is_read_agreements'
                )?.message,
              })}
            />
            <Label
              htmlFor="is_read_agreements"
              className="cursor-pointer !text-md"
            >
              以下を読んで同意しました（{' '}
              <LocalizedClientLink
                href="/terms-and-conditions"
                className="w-max transition-all duration-200 hover:underline"
              >
                規約
              </LocalizedClientLink>{' '}
              と{' '}
              <LocalizedClientLink
                href="/privacy-policy"
                className="w-max transition-all duration-200 hover:underline"
              >
                プライバシーポリシー
              </LocalizedClientLink>
              ）
            </Label>
          </Box> */}
          {validationErrors.find(
            (error) => error.field === 'is_read_agreements'
          ) && (
            <ErrorMessage
              error={
                validationErrors.find(
                  (error) => error.field === 'is_read_agreements'
                )?.message
              }
              data-testid="agreements-error"
            />
          )}
          <SubmitButton className="mt-6 w-full bg-[#B8193F] hover:bg-[#D6355D] active:bg-[#A11637]" data-testid="register-button">
            新規会員登録
          </SubmitButton>
        </form>
      </Box>
      <LoginPrompt setCurrentView={setCurrentView} />
    </Box>
  )
}

export default Register
