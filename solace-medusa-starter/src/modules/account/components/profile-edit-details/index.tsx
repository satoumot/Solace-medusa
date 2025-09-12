'use client'

import { useActionState, useEffect, useState } from 'react'

import { updateCustomer } from '@lib/data/customer'
import { HttpTypes } from '@medusajs/types'
import { SubmitButton } from '@modules/checkout/components/submit-button'
import { Button } from '@modules/common/components/button'
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@modules/common/components/dialog'
import { Input } from '@modules/common/components/input'
import { toast } from '@modules/common/components/toast'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

const ProfileEditDetails = ({
  open,
  closeModal,
  onOpenChange,
  customer,
}: {
  open: boolean
  closeModal: () => void
  onOpenChange: () => void
  customer: HttpTypes.StoreCustomer
}) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [formState, formAction] = useActionState(updateCustomer, {
    success: false,
    error: null,
  })

  const close = () => {
    setIsSuccess(false)
    closeModal()
  }

  useEffect(() => {
    if (formState.success) {
      setIsSuccess(true)
    }
  }, [formState])

  useEffect(() => {
    if (isSuccess) {
      toast('success', 'アカウント情報が更新されました')
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="tonal"
          size="sm"
          className="w-fit medium:hidden"
          data-testid="edit-details-button"
        >
          編集
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          className="max-h-fit max-w-[650px] !rounded-none border border-action-primary"
          aria-describedby={undefined}
        >
          <form
            className="flex h-full flex-col medium:h-fit"
            action={formAction}
          >
            <DialogHeader className="flex items-center text-xl medium:p-6 medium:text-2xl">
              アカウント情報編集
              <DialogClose className="right-4" />
            </DialogHeader>
            <VisuallyHidden.Root>
              <DialogTitle>Select address modal</DialogTitle>
            </VisuallyHidden.Root>
            <DialogBody className="overflow-y-auto p-5">
              <div className="grid grid-cols-1 gap-4 medium:grid-cols-2">
               <Input
                  label="苗字"
                  name="last_name"
                  required
                  defaultValue={customer.last_name}
                  data-testid="last-name-input"
                />
               <Input
                  label="名前"
                  name="first_name"
                  required
                  defaultValue={customer.first_name}
                  data-testid="first-name-input"
                />
                <Input
                  disabled
                  label="メールアドレス"
                  name="email"
                  required
                  defaultValue={customer.email}
                  data-testid="email-input"
                />
                <Input
                  label="大学CD"
                  name="phone"
                  required
                  defaultValue={customer.phone}
                  data-testid="phone-input"
                />
                {formState.error && (
                  <div
                    className="text-small-regular py-2 text-rose-500"
                    data-testid="address-error"
                  >
                    {formState.error}
                  </div>
                )}
              </div>
            </DialogBody>
            <DialogFooter className="mt-auto">
              <SubmitButton
                data-testid="save-details-button"
                className="w-full bg-[#B8193F]　hover:bg-[#D6355D] active:bg-[#A11637]"
              >
                保存
              </SubmitButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default ProfileEditDetails
