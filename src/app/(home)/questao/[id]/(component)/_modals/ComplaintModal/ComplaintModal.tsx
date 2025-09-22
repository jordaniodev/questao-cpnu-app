import { ResponsiveModal } from "@/components/smart/ResponsiveModal/responsiveModal"
import { Button } from "@/components/ui/button"
import { usePrivateFetch } from "@/lib/fetchPrivateClient";
import { closeModal, openModal } from "@/lib/modal-helpers";
import NiceModal from "@ebay/nice-modal-react";
import { useState } from "react";
import { useParams } from "next/navigation";


const ComplaintModal = NiceModal.create(() => {
  const fetchClient = usePrivateFetch();
  const [appelDescription, setAppelDescription] = useState<string>();  

  const params = useParams();
  const id = params?.id;

  const handleSubmitComplaint = async () => {
    if(!appelDescription) return;
    await fetchClient(`question/${id}/appel`, {
      method: 'POST',
      body: JSON.stringify({ description: appelDescription })
    });

    closeComplaintModal();
  }

  return (
    <ResponsiveModal title="Solicitar recurso da questão" size="md">
      <div className=" gap-4 flex flex-col">
        <p className="text-sm font-normal text-card-foreground">Encontrou algo errado ou discorda da resposta final? Nos explique o motivo para nos ajudar a corrigir ou melhorar nossas questões!</p>
        <textarea className="w-full h-[100px] p-2 border border-border rounded-md text-sm" onChange={(e) => setAppelDescription(e.target.value)} placeholder="Explique o motivo"></textarea>

        <Button variant="default" className="self-end w-30" onClick={handleSubmitComplaint} disabled={!appelDescription}>Enviar</Button>
        <div className="justify-start flex p-0">
          <span className="text-xs text-muted-foreground text-left">Você receberá um feedback sobre sua solicitação pelo email cadastrado no seu perfil.</span>
        </div>
      </div>
    </ResponsiveModal>
  )
});

NiceModal.register("ComplaintModal", ComplaintModal);

const openComplaintModal = () => openModal("ComplaintModal");
const closeComplaintModal = () => closeModal("ComplaintModal");

export {
  ComplaintModal,
  openComplaintModal,
  closeComplaintModal,
};
