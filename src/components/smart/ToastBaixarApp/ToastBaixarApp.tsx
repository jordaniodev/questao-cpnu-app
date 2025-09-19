'use client'

import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription } from "@/components/ui/card"
import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { isIOS } from 'react-device-detect';
import { openToastBaixarAppItem } from "./ToastBaixarAppItem/ToastBaixarAppItem"
import Image from "next/image"

const LOCAL_STORAGE_KEY = "toastClosedAt"

export const ToastBaixarApp = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const closedAt = localStorage.getItem(LOCAL_STORAGE_KEY)
    const now = new Date().getTime()

    if (!closedAt || now - parseInt(closedAt) > 86400000) {
      setOpen(true)
    }
  }, [])

  const handleClose = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, Date.now().toString())
    setOpen(false)
  }

  if (!open || !isIOS) return null

  return (
    <Card className="fixed top-4 left-1/2 -translate-x-1/2 flex items-center flex-row p-4 gap-2 w-[375px] z-50">
      <CardContent className="flex gap-3 px-0 items-center">
        <Button
          variant="ghost"
          className="border-none shadow-none !p-0"
          onClick={handleClose} 
        >
          <X />
        </Button>
        <Image src="/images/android.png" alt="Logo" width={82} height={82} />
        <CardDescription className="p-0 flex text-xs font-normal">
          Obtenha acesso rápido ao nosso aplicativo — instale-o agora no seu dispositivo.
        </CardDescription>
        <CardAction className="flex items-center justify-center self-center">
          <Button onClick={openToastBaixarAppItem}>
            Instalar
          </Button>
        </CardAction>
      </CardContent>
    </Card>
  )
}
