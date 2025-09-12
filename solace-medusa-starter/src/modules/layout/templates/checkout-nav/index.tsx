import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import { Container } from '@modules/common/components/container'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { Text } from '@modules/common/components/text'
import { ArrowLeftIcon, SolaceLogo } from '@modules/common/icons'

export default function CheckoutNav() {
  return (
    <Container
      as="nav"
      className="flex max-w-full h-full items-center justify-between !py-3 small:!py-4 bg-[#B8193F]"
    >
      <Box className="small:flex-1">
        <Button variant="tonal" asChild className="w-max bg-transparent text-white border border-white hover:bg-white/20">
          <LocalizedClientLink href="/cart">
            <Box className="flex gap-2">
              <ArrowLeftIcon />
              <Text>
                {''}
                <Text as="span" className="hidden small:inline">
                  カート画面へ
                </Text>{' '}
                戻る
              </Text>
            </Box>
          </LocalizedClientLink>
        </Button>
      </Box>
      <Box className="flex items-center justify-center flex-1 small:justify-center text-white text-center">
        <LocalizedClientLink href="/shop">
          {/* <SolaceLogo className="h-6 small:h-7" /> */}
          <span className="text-xl font-bold">
          三省堂書店　
          <br className="small:hidden" />
          学校オンラインストア
          </span>
        </LocalizedClientLink>
      </Box>
      <div className="hidden flex-1 basis-0 small:flex" />
    </Container>
  )
}
