'use client'

import useToggleState from '@lib/hooks/use-toggle-state'
import { HttpTypes } from '@medusajs/types'
import { Button } from '@modules/common/components/button'

import ProfileEditDetails from '../profile-edit-details'

const ProfileDetails = ({
  customer,
}: {
  customer: HttpTypes.StoreCustomer
}) => {
  const { state, toggle, close } = useToggleState(false)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl medium:text-2xl">アカウント情報</h1>
        <Button
          variant="tonal"
          size="sm"
          onClick={toggle}
          className="hidden medium:flex"
          data-testid="edit-details-button"
        >
          編集
        </Button>
      </div>

      <div className="bg-primary p-2">
        <div className="p-4">
          <p className="text-md text-secondary">氏名</p>
          <p className="text-basic-primary">
            {customer.first_name} {customer.last_name}
          </p>
        </div>
        <div className="p-4">
          <p className="text-md text-secondary">メールアドレス</p>
          <p className="text-basic-primary">{customer.email}</p>
        </div>
        <div className="p-4">
          <p className="text-md text-secondary">大学CD</p>
          <p className="text-basic-primary">{customer.phone}</p>
        </div>
      </div>
      <ProfileEditDetails
        customer={customer}
        open={state}
        closeModal={close}
        onOpenChange={toggle}
      />
    </div>
  )
}

export default ProfileDetails
