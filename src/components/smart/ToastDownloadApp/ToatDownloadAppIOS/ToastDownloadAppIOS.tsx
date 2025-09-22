import { ResponsiveModal } from "@/components/smart/ResponsiveModal/responsiveModal"
import { Card } from "@/components/ui/card";
import { closeModal, openModal } from "@/lib/modal-helpers";
import NiceModal from "@ebay/nice-modal-react";
import { SquarePlus } from "lucide-react";
import Image from "next/image";


const ToastDownloadAppIOS = NiceModal.create(() => {
    return (
        <ResponsiveModal title="Instalar o aplicativo" size="md">
            <div className=" gap-4 flex flex-col mt-4">
                <Card className="bg-accent p-4">
                    <div className="flex gap-4">
                        <Image src="/images/logo/concurso-app-icon.svg" alt="Logo" width={48} height={48}/>
                        <div className="flex flex-col gap-1">
                            <span className="text-primary text-sm font-extrabold">Concurso.app</span>
                            <span className="text-muted-foreground text-xs font-normal">Concurso.app</span>
                        </div>
                    </div>
                </Card>

                <div className="!justify-start flex p-0 pl-4">
                    <ol className="list-decimal  flex flex-col gap-2">
                        <li className="text-sm text-card-foreground font-normal">
                            <div className="flex items-center gap-1">
                                <p>Toque em no</p>
                                <img src="/images/shareIcon.svg" alt="Ícone de compartilhar" />
                                <p>menu do navegador.</p>
                            </div>
                        </li>
                        <li className="text-sm text-card-foreground font-normal">
                            <div className="flex items-center gap-1">
                                <p>Role e selecione</p>
                                <div className="flex rounded-md bg-muted py-1 px-2 gap-2 items-center h-5">
                                    <SquarePlus className="w-3 h-3" />
                                    <p className="text-[10px] font-medium text-card-foreground">Adicionar à tela de início</p>
                                </div>
                            </div>
                        </li>
                        <li className="text-sm text-card-foreground font-normal">
                            <div className="flex items-center gap-1">
                                <p>Procure pelo ícone</p>
                                <Image src="/images/logo/concurso-app-icon.svg" alt="Logo" width={20} height={20} />
                                <p>menu do seu celular.</p>
                            </div>
                        </li>
                    </ol>
                </div>
            </div>
        </ResponsiveModal>
    )
});

NiceModal.register("ToastDownloadAppIOS", ToastDownloadAppIOS);

const openToastDownloadAppIOS = () => openModal("ToastDownloadAppIOS", {});
const closeToastDownloadAppIOS = () => closeModal("ToastDownloadAppIOS");

export {
  ToastDownloadAppIOS,
  openToastDownloadAppIOS,
  closeToastDownloadAppIOS,
};
