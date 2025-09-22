import { ResponsiveModal } from "@/components/smart/ResponsiveModal/responsiveModal"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card";
import NiceModal from "@ebay/nice-modal-react";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { openModal, closeModal } from "@/lib/modal-helpers"; 


const SubscriptionModal = NiceModal.create(() => {
  
  const openAssinatura = () => {
    window.open("https://consumer.hotmart.com/main", "_blank", "noopener,noreferrer");
  };
  
  return (
    <ResponsiveModal title="Minha assinatura" size="sm" contentClassName="flex flex-col gap-4 !h-auto">
      <div className=" gap-4 flex flex-col">
        <Card className="bg-muted p-4 gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-primary text-sm font-extrabold">Concurso.app</span>
            <Button variant="secondary" className="bg-background self-start" size="sm">Expira em 05/10/2025</Button>
          </div>
        </Card>
          
        <div className="justify-start flex flex-col gap-2">
          <span className="text-xs text-muted-foreground text-left">Sua assinatura é gerenciada pela Hotmart.</span>
          <Button variant="outline" className="justify-between" onClick={openAssinatura}>
            <div className="flex gap-1 items-center">
              <Image src="/images/hotmart.svg" alt="Hotmart" width={16} height={16} />
              <p>Gerenciar minha assinatura</p>
            </div>
            <ExternalLink width={16} height={16}/>
          </Button>
        </div>
      </div>
    </ResponsiveModal>
  )
});

NiceModal.register("SubscriptionModal", SubscriptionModal); 

 const openSubscriptionModal = () => openModal("SubscriptionModal");
 const closeSubscriptionModal = () => closeModal("SubscriptionModal");

export {
  SubscriptionModal,
  openSubscriptionModal,
  closeSubscriptionModal,
};
