import { listCategories } from '@lib/data/categories'
import { getCollectionsList } from '@lib/data/collections'
// import { getCollectionsData } from '@lib/data/fetch'
import { getProductsList } from '@lib/data/products'
import { Container } from '@modules/common/components/container'

import NavActions from './nav-actions'
import NavContent from './nav-content'

export default async function NavWrapper(props: any) {
  // const [productCategories, { collections }, strapiCollections, { products }] =
  //   await Promise.all([
  //     listCategories(),
  //     getCollectionsList(),
  //     getCollectionsData(),
  //     getProductsList({
  //       pageParam: 0,
  //       queryParams: { limit: 4 },
  //       countryCode: props.countryCode,
  //     }).then(({ response }) => response),
  //   ])

  return (
    <Container
      as="nav"
      className="duration-400 sticky top-0 z-50 mx-0 max-w-full border-b border-basic-primary bg-[#B8193F] text-white !py-0 transition-all ease-in-out medium:!px-14"
    >
      <Container className="hidden small:flex items-center justify-between !p-0">
        <div className="w-1/3">
        {/* <p>お問い合わせ</p> */}
        </div>

        <div className="flex items-center w-1/3 justify-center">
          <NavContent
            // productCategories={productCategories}
            // collections={collections}
            // strapiCollections={strapiCollections}
            // countryCode={props.countryCode}
            // products={products}
          />
        </div>

        <div className="flex items-center w-1/3 justify-end">
          <NavActions />
        </div>
      </Container>
      <div className="flex flex-col small:hidden">
        {/* 1段目: ロゴ */}
        <div className="w-full py-3 text-center border-b border-white/20">
          <NavContent />
        </div>

        {/* 2段目: リンクとアイコン */}
        <div className="w-full flex items-center justify-end py-2">
          {/* <p>お問い合わせ</p> */}
          <NavActions />
        </div>
      </div>
    </Container>
  )
}
