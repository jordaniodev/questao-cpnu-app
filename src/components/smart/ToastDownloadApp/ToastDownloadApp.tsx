'use client'

import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription } from "@/components/ui/card"
import { X } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { openToastDownloadAppIOS } from "./ToatDownloadAppIOS/ToastDownloadAppIOS"

export type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

const LOCAL_STORAGE_KEY = "toastClosedAt"

export const ToastDownloadApp = () => {
  const [needOpens, setNeedOpen] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      const closedAt = localStorage.getItem(LOCAL_STORAGE_KEY)
      const now = new Date().getTime()
      const oneDay = 1 * 24 * 60 * 60 * 1000;
      if (!closedAt || now - parseInt(closedAt) > oneDay) {
        setNeedOpen(true)
        setTimeout(() => {
          setNeedOpen(false)
        }, 5000)
      }
    });
  }, []);

  const handleClose = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, Date.now().toString())
    setNeedOpen(false)
  }

  if (!needOpens) return null;
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
        <Image src="/images/logo/concurso-app-icon.svg" alt="Logo" width={32} height={32} />
        <CardDescription className="p-0 flex text-xs font-normal">
          Obtenha acesso rápido ao nosso aplicativo — instale-o agora no seu dispositivo.
        </CardDescription>
        <CardAction className="flex items-center justify-center self-center">
          <Button onClick={openToastDownloadAppIOS}>
            Instalar
          </Button>
        </CardAction>
      </CardContent>
    </Card>
  )
}
