import { ResponsiveModal } from "@/components/smart/ResponsiveModal/responsiveModal"
import { Button } from "@/components/ui/button"
import NiceModal from "@ebay/nice-modal-react";
import { openModal, closeModal } from "@/lib/modal-helpers"; 
import { InterestContestsModalItem } from "./InterestContestsModalItem/InterestContestsModalItem";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const concursos = [
  "PRF - Polícia Rodoviária Federal",
  "Banco do Brasil",
  "CBM-DF - Corpo de bombeiros militares DF",
  "Caixa Econômica Federal",
  "AFA - Academia da Força Aérea"
]


const InterestContestsModal = NiceModal.create(() => {

  const [selected, setSelected] = useState<{ [key: string]: boolean }>({})
  const [outro, setOutro] = useState("")


  const handleChange = (title: string, checked: boolean) => {
    setSelected((prev) => ({
      ...prev,
      [title]: checked,
    }))
  }

  const handleSubmit = () => {
    const escolhidos = Object.keys(selected).filter((key) => selected[key])
    const concursosEnviados = {
      concursos: escolhidos,
      outro: outro.trim() || null
    }

    console.log("concursos enviados teste:", concursosEnviados)
  }
  
  return (
    <ResponsiveModal title="Que outros concursos te interessam ?" size="sm" contentClassName="flex flex-col gap-4 !h-auto">
      <div className="gap-3 flex flex-col">
        {concursos.map((title) => (
          <InterestContestsModalItem 
            key={title} 
            title={title} 
            onChange={(checked) => handleChange(title, checked)} 
          />
        ))}
      </div>
      <div className="flex gap-2 flex-col">
        <p className="text-xs text-foreground">outros</p>
        <Input 
          placeholder="Escreva aqui" 
          value={outro} 
          onChange={(e) => setOutro(e.target.value)} 
        />
      </div>
      <Button variant="default" size="sm" className="self-end" onClick={handleSubmit}>Enviar</Button>
    </ResponsiveModal>
  )
});

NiceModal.register("InterestContestsModal", InterestContestsModal); 

 const openInterestContestsModal = () => openModal("InterestContestsModal");
 const closeInterestContestsModal = () => closeModal("InterestContestsModal");

export {
  InterestContestsModal,
  openInterestContestsModal,
  closeInterestContestsModal,
};
