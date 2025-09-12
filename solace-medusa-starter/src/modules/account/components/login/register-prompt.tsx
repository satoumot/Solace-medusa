import { LOGIN_VIEW } from '@modules/account/templates/login-template'
import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import { Heading } from '@modules/common/components/heading'

export default function RegisterPrompt({
  setCurrentView,
}: {
  setCurrentView: (view: LOGIN_VIEW) => void
}) {
  return (
    <Box className="flex w-full flex-col gap-6 bg-primary p-4 small:p-5">
      <Heading as="h2" className="text-xl small:text-2xl">
        アカウントをお持ちでない方はこちら
      </Heading>
      <Button
        variant="tonal"
        className="w-full"
        onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
      >
        アカウント登録
      </Button>
    </Box>
  )
}
