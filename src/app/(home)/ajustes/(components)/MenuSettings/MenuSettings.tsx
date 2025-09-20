'use client'

import { Button } from "@/components/ui/button"
import { FileText, Phone, Wallet } from "lucide-react"
import { SubscriptionModal } from "../SubscriptionModal/SubscriptionModal"
import Image from "next/image"
import { MenuSettingsItem } from "./MenuSettingsItem/MenuSettingsItem"
import NiceModal from "@ebay/nice-modal-react" 
import { ChooseModeDarkLight } from "@/components/smart/ChooseModeDarkLight/ChooseModeDarkLight"
import { UserInfo } from "@/components/smart/UserInfo/UserInfo"
import { openToastBaixarAppItem } from "@/components/smart/ToastBaixarApp/ToastBaixarAppItem/ToastBaixarAppItem"
import { isIOS } from "react-device-detect"
import { InstallPWAButton } from "@/app/(components)/InstallPWA"
import { useCountQuestion } from "@/components/smart/CountQuestion/CountQuestionContext"
import { CountQuestionBadge } from "@/components/smart/CountQuestionBadge/CountQuestionBadge"

const items = [ 
  {
    icon: <Wallet size={16} />,
    description: "Minha assinatura",
    action: () => NiceModal.show(SubscriptionModal),
  },
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
  const { count } = useCountQuestion();
  return (
    <div className="flex-col gap-4 flex w-full md:w-[500px]">
      <CountQuestionBadge className="mt-[10px]" />
      <UserInfo />

      <div className="px-2 w-full gap-0 justify-start border rounded-lg">
         {/* <ChooseModeDarkLight /> */}
        {items.map((item, idx) => (
          <MenuSettingsItem key={idx} items={item} />
        ))}
      </div>

      <Button variant="outline" className="justify-start p-4" onClick={openToastBaixarAppItem}>
        <Image src="/images/apple.svg" alt="logo" width={16} height={16} />
        Instalar Aplicativo
      </Button>
    </div>
  )
}


