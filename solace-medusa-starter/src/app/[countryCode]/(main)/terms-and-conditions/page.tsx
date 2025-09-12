import { Metadata } from 'next'

// import { getContentPage } from '@lib/data/fetch'
import { serializeMdx } from '@lib/util/serializeMdx'
import { Box } from '@modules/common/components/box'
import { Container } from '@modules/common/components/container'
import { Heading } from '@modules/common/components/heading'
import SidebarBookmarks from '@modules/content/components/sidebar-bookmarks'
import { MDXRemote } from '@modules/mdx/MDXRemote'
import StoreBreadcrumbs from '@modules/store/templates/breadcrumbs'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Review the terms governing the use of our website, products and services, including user responsibilities, legal rights, and policies.',
}

export default async function TermsAndConditionsPage() {
  // const {
  //   data: { PageContent },
  // } = await getContentPage('terms-and-condition', 'terms-and-conditions')

  // const mdxSource = await serializeMdx(PageContent)

  // const bookmarks = mdxSource.frontmatter.headings.map((heading) => {
  //   return {
  //     id: heading.id,
  //     label: heading.title,
  //   }
  // })

  return (
    <Container className="min-h-screen max-w-full bg-secondary !p-0">
      <Container className="!py-8">
        <StoreBreadcrumbs breadcrumb="Terms & Conditions" />
        <Heading as="h1" className="mt-4 text-4xl medium:text-5xl">
          注文上の注意事項
        </Heading>
        <Box className="mt-6 grid grid-cols-12 medium:mt-12">
          <Box className="col-span-12 mb-10 medium:col-span-3 medium:mb-0">
            {/* <SidebarBookmarks data={bookmarks} /> */}
          </Box>
          <Box className="col-span-12 space-y-10 medium:col-span-8 medium:col-start-5">
            {/* <MDXRemote source={mdxSource} /> */}
            ※決済でエラーが発生した場合は、<br />
お手数をおかけしますが、ブラウザのキャッシュをクリア（Ctrl + F5）し、<br />
開いているブラウザを全て閉じた上で、再ログインいただきますようお願いいたします。<br />
<br />
※「受付期間」「受け取り方法」「決済方法の種類」などは学校ごとに異なります。<br />
下記は基本的な例です。詳しくは各学校のHP等であらかじめ発信されている「購入マニュアル等」をご確認下さい。<br />
<br />
■テキストの発送について<br />
・　「クレジットカード決済」<br />
・　「代金引換」<br />
本サイトでのご注文手続き完了後、翌日～5日（土日、祝日を除く）以内に発送いたします。<br />
<br />
・　「コンビニ払い」<br />
本サイトでのご注文手続き完了後、コンビニでのお支払いが確認出来ましたら、翌日～5日（土日、祝日を除く）以内に発送いたします。<br />
所定の期日までにお支払いがない場合はキャンセル扱いになりますので、お気をつけ下さい。<br />
<br />
なお、学内に「三省堂書店の売店がある」場合や、テキスト販売所での「お取り置きサービス」を行っている場合は、<br />
本サイトでご注文のテキストの店頭決済、店頭受取が可能です。<br />
「受付翌日～3日（土日祝日を除く）」がお渡しの目安となります。<br />
詳しくは各学校からの「購入マニュアル等」でご確認下さい。<br />
<br />
■コンビニ払いの手順について<br />
コンビニ払いが設定されている学校の販売サイトでコンビニ払いを選択した場合、<br />
ご注文手続きが完了しますと「注文確認メール」と「決済受付完了メール」がお客様に送信されます。<br />
その後の支払い方法はコンビニチェーン毎に異なります。各コンビニの支払い方法は、以下をご参照下さい。<br />
https://www.sbpayment.jp/support/how_to_pay/cvs/<br />
<br />
■メールの受信について<br />
下記のドメインよりメールが送信されますので、迷惑メール対策でドメイン指定受信を設定している場合は、受信の許可をするよう設定の変更をお願いします。<br />
・　「@mail.books-sanseido.co.jp」<br />
・　「@sbpayment.jp」<br />
・　「@books-sanseido.co.jp」<br />
<br />
■サイト内の価格表記について<br />
検定教科書などの一部非課税商品を除き、サイト内の販売価格は全て税込み表記です。<br />
<br />
■送料について<br />
送料は商品の配送先、購入冊数によって変動いたします。<br />
<br />
■個人情報の取扱いについて<br />
本サービスで入力頂いた個人情報は、以下の規約に従って利用いたします。<br />
https://www.books-sanseido.co.jp/privacypolicy/<br />
<br />
■お問い合わせ先<br />
各学校のHP等であらかじめ発信されている「購入マニュアル等」に記載の営業所・　売店までご連絡下さい。<br />
          </Box>
        </Box>
      </Container>
    </Container>
  )
}
