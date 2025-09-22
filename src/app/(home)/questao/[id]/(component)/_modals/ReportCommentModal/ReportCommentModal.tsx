import { ResponsiveModal } from "@/components/smart/ResponsiveModal/responsiveModal"
import { Button } from "@/components/ui/button"
import { closeModal, openModal } from "@/lib/modal-helpers";
import NiceModal from "@ebay/nice-modal-react";
import { ReportCommentModalProps } from "./ReportCommentModal.type";
import { useState } from "react";
import { Comments } from "../../CommunityComment/CommunityComment.type";


const ReportCommentModal = NiceModal.create(({ commentId }: ReportCommentModalProps) => {

  return <></>
  // const [reportReason, setReportReason] = useState<string>("");

  // const handleSubmitCommentReport = async () => {

  //   const response = await fetchPrivateClient<Comments[]>(`question/${id}/comment`, {
  //     method: 'GET',
  //     next: { revalidate: 60 * 60 * 24 * 30 }
  //   });
  // }

  // return (
  //   <ResponsiveModal title="Reportar comentário" size="md">
  //     <div className=" gap-4 flex flex-col">
  //       <p className="text-sm font-normal text-card-foreground">Algo de errado com este comentário? Nos explique o motivo!</p>
  //       <textarea className="w-full h-[100px] p-2 border border-border rounded-md text-sm" placeholder="Explique o motivo" value={reportReason} onChange={(e) => setReportReason(e.target.value)}></textarea>
  //         <Button variant="default" className="self-end w-30" disabled={!reportReason} onClick={handleSubmitCommentReport}>Enviar</Button>
  //       <div className="justify-start flex p-0">
  //         <span className="text-xs text-muted-foreground text-left">Você receberá um feedback sobre sua solicitação pelo email cadastrado no seu perfil.</span>
  //       </div>
  //     </div>
  //   </ResponsiveModal>
  // )
});

NiceModal.register("ReportCommentModal", ReportCommentModal);

const openReportCommentModal = () => openModal("ReportCommentModal");
const closeReportCommentModal = () => closeModal("ReportCommentModal");

export {
  ReportCommentModal,
  openReportCommentModal,
  closeReportCommentModal,
};
