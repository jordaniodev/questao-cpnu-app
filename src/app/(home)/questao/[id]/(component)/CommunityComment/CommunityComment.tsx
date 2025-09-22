'use client';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Comments, CommunityCommentProps } from "./CommunityComment.type";
import { Button } from "@/components/ui/button";
import { Flag, LoaderCircle, Send } from "lucide-react";
import { openReportCommentModal } from "../_modals/ReportCommentModal/ReportCommentModal";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { usePrivateFetch } from "@/lib/fetchPrivateClient";
import { useParams } from "next/navigation";

export const CommunityComment = ({
  comments = []
}: CommunityCommentProps) => {

  const [commentContent, setCommentContent] = useState<string>();
  const [clientComments, setClientComments] = useState<CommunityCommentProps["comments"]>(comments || []);
  const [loadingSendComment, setLoadingSendComment] = useState<boolean>(false);
  const params = useParams();
  const id = params?.id;

  const fetchPrivateClient = usePrivateFetch();

  const loadQuestions = async () => {

    const response = await fetchPrivateClient<Comments[]>(`question/${id}/comment`, {
      method: 'GET',
      next: { revalidate: 60 * 60 * 24 * 30 }
    });

    setClientComments(response || []);

  }
  const handleSubmitComment = async () => {
    if (!commentContent) return;

    setLoadingSendComment(true);
    await fetchPrivateClient(`question/${id}/comment`, {
      method: 'POST',
      body: JSON.stringify({ content: commentContent }),
    });

    await loadQuestions()
    setCommentContent("");
    setLoadingSendComment(false);
  }

  return (
    <div className="flex flex-col w-full py-4">
      {clientComments.length > 0 ? (
        <div className="flex flex-col gap-4 mt-4 max-h-[200px] overflow-y-auto">
          {clientComments.map((comment, index) => (
            <div key={index} className="flex flex-col gap-4 pb-4">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>
                    {comment.user?.name ? comment.user.name.charAt(0).toUpperCase() : ""}
                  </AvatarFallback>
                </Avatar>
                <div className="flex justify-between w-full">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold self-start text-xs">{comment.user?.name}</span>
                    <span className="text-[10px] text-muted-foreground self-start">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {/* <Button variant={'ghost'} className="text-muted-foreground" onClick={openReportCommentModal} >
                    <Flag />
                  </Button> */}
                </div>
              </div>
              <div className="text-sm text-justify font-normal">{comment.content}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col w-full my-4">
          <div className="flex flex-col gap-4 mt-4 max-h-[200px] overflow-y-auto">
            <span className="text-sm text-muted-foreground">Nenhum comentário disponível. Seja o primeiro a comentar!</span>
          </div>
        </div>
      )}
      <div className="flex items-center gap-2 bottom-0 bg-background w-full">
        <Input
          type="text"
          placeholder="Contribua com um comentário"
          onChange={(e) => {setCommentContent(e.target.value)}}
          value={commentContent}
          className="border rounded-md p-2 w-full text-sm focus:none"
        />
        <Button variant="ghost" onClick={handleSubmitComment} disabled={!commentContent || loadingSendComment}>
          {loadingSendComment ? <LoaderCircle className="animate-spin" /> : <Send />}
        </Button>
      </div>
    </div>
  )
}
