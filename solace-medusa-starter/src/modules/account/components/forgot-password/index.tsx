'use client'

import { useActionState, useState } from 'react'

import { emailRegex } from '@lib/constants'
import { forgotPassword } from '@lib/data/customer'
import { cn } from '@lib/util/cn'
import { LOGIN_VIEW } from '@modules/account/templates/login-template'
import { SubmitButton } from '@modules/checkout/components/submit-button'
import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import { Heading } from '@modules/common/components/heading'
import { Input } from '@modules/common/components/input'
import { Text } from '@modules/common/components/text'
import { SearchResultsIcon } from '@modules/common/icons'

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const ForgotPassword = ({ setCurrentView }: Props) => {
  const [, formAction] = useActionState(forgotPassword, null)
  const [emailInputError, setEmailInputError] = useState(null)
  const [email, setEmail] = useState(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    if (!formData.get('email')) {
      setEmailInputError('Please enter')
      return
    }

    if (!emailRegex.test(formData.get('email').toString())) {
      setEmailInputError('Please enter a valid email')
      return
    }
    formAction(formData)
    setEmailInputError('')
    setEmail(formData.get('email').toString())
  }

  return (
    <Box
      className={cn('flex w-full flex-col gap-6 p-4 small:p-5', {
        'bg-primary': !email,
        'mx-auto max-w-[438px] items-center': !!email,
      })}
    >
      {email ? (
        <>
          <SearchResultsIcon />
          <Box className="text-center">
            <Heading className="mb-2 text-xl small:text-2xl">
              メールを確認してください
            </Heading>
            <Text className="text-secondary" size="md">
              リセットメールは {email} 宛に送信されました。
              ご入力のメールアドレスがアカウントに登録されている場合、
              まもなくパスワード再設定のご案内をお送りします。
              受信トレイと迷惑メールフォルダをご確認ください。
              なお、リンクの有効期限は1時間です。
            </Text>
          </Box>
        </>
      ) : (
        <>
          <Box className="flex flex-col gap-2">
            <Heading className="text-xl small:text-2xl">
              パスワードを忘れてしまった場合
            </Heading>
            <Text className="text-secondary" size="md">
              ログイン用のメールアドレスを入力してください。リセットメールをお送りします。
            </Text>
          </Box>
          <form onSubmit={handleSubmit}>
            <Input
              label="メールアドレス"
              name="email"
              type="email"
              autoComplete="email"
              required
              error={emailInputError}
              data-testid="email-input"
            />
            <Box className="flex flex-col gap-4">
              <SubmitButton
                data-testid="sign-in-button"
                className="mt-6 w-full bg-[#B8193F] hover:bg-[#D6355D] active:bg-[#A11637]"
              >
                リセットメールを送信
              </SubmitButton>
              <Button
                variant="text"
                className="w-full"
                onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
              >
                ログインに戻る
              </Button>
            </Box>
          </form>
        </>
      )}
    </Box>
  )
}

export default ForgotPassword
