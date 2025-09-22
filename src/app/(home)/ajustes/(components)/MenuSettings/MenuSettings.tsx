'use client'

import { Button } from "@/components/ui/button"
import { FileText, Phone, Wallet } from "lucide-react"
import { SubscriptionModal } from "../SubscriptionModal/SubscriptionModal"
import Image from "next/image"
import { MenuSettingsItem } from "./MenuSettingsItem/MenuSettingsItem"
import NiceModal from "@ebay/nice-modal-react"
import { UserInfo } from "@/components/smart/UserInfo/UserInfo"
import { useCountQuestion } from "@/components/smart/CountQuestion/CountQuestionContext"
import { CountQuestionBadge } from "@/components/smart/CountQuestionBadge/CountQuestionBadge"
import { openToastDownloadAppIOS } from "@/components/smart/ToastDownloadApp/ToatDownloadAppIOS/ToastDownloadAppIOS"
import { isIOS, isWindows, deviceType, isMacOs } from 'react-device-detect';
import { useEffect, useState } from "react"
import { BeforeInstallPromptEvent } from "@/components/smart/ToastDownloadApp/ToastDownloadApp"
import { User } from "@/types/User"
import { usePrivateFetch } from "@/lib/fetchPrivateClient"

const items = [
  {
    icon: <Phone size={16} />,
    description: "Suporte",
    action: () => window.open("https://api.whatsapp.com/send/?phone=5561993311671&text=Vim+do+site+e+preciso+de+ajuda.&type=phone_number&app_absent=0", "_blank"),
  },
  {
    icon: <FileText size={16} />,
    description: "Termos de uso",
    action: () => console.log("termos e uso teste"),
  },
]

export const MenuSettings = () => {
  const [icon, setIcon] = useState("/images/icons/playstore.png");
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showButton, setShowButton] = useState(true);
  const [user, setUser] = useState<User | undefined>(undefined);
  const fetchPrivate = usePrivateFetch();
  const [menuItems, setMenuItems] = useState([...items]);


  const loadUser = async () => {
    if (typeof window !== "undefined") {
      const userData = await fetchPrivate<User>(`users/me`);
      if (userData?.planValidUntil) {
        setMenuItems(prev => [...prev, {
          icon: <Wallet size={16} />,
          description: "Minha assinatura",
          action: () => NiceModal.show(SubscriptionModal),
        }]);
      }
    }
  }

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowButton(true);
    });

    loadUser()

    if (isIOS || isMacOs) {
      setIcon("/images/icons/apple.svg");
    } else if (isWindows) {
      setIcon("/images/icons/windows.svg");
    } else {
      setIcon("/images/icons/playstore.png");
    }
  }, []);

  const handleInstallClick = async () => {

    if (isIOS) {
      openToastDownloadAppIOS();
      return;
    }
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setShowButton(false);
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="flex-col gap-4 flex w-full md:w-[500px]">
      <CountQuestionBadge className="mt-[10px]" />
      <UserInfo />

      <div className="px-2 w-full gap-0 justify-start border rounded-lg">
        {/* <ChooseModeDarkLight /> */}
        {menuItems.map((item, idx) => (
          <MenuSettingsItem key={idx} items={item} />
        ))}
      </div>

      {showButton && <Button variant="outline" className="justify-start flex-1 p-4" onClick={handleInstallClick}>
        <Image src={icon} alt="logo" width={16} height={16} />
        <span className="ml-2">Instalar Aplicativo</span>
      </Button>}
    </div>
  )
}

