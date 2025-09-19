import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CommunityCommentProps } from "./CommunityComment.type";
import { Button } from "@/components/ui/button";
import { Flag, Send } from "lucide-react";
import { openReportCommentModal } from "../_modals/ReportCommentModal/ReportCommentModal";
import { Input } from "@/components/ui/input";

export const CommunityComment = ({
  users
}: CommunityCommentProps) => {
  return (
    <div className="flex flex-col gap-4 mt-4 max-h-[250px] overflow-y-auto">
      {users.map((user,index) => (
        <div key={index} className="flex flex-col gap-4 pb-4">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>
                {user.userName?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold self-start text-xs">{user.userName}</span>
                <span className="text-[10px] text-muted-foreground self-start">
                  {user.commentDate}
                </span>
              </div>
              
              <Button variant={'ghost'} className="text-muted-foreground" onClick={openReportCommentModal} >
                <Flag />
              </Button>
            </div>
          </div>

          <div className="text-sm text-justify font-normal">{user.commentText}</div>
        </div>
      ))}
      <div className="flex items-center gap-2 fixed bottom-0 bg-background w-full left-0 right-0 px-4 py-2">
        <Input
          type="text"
          placeholder="Contribua com um comentário"
          className="border rounded-md p-2 w-full text-sm focus:none"
        />
        <Button variant="ghost">
          <Send />
        </Button>
      </div>
    </div>
  )}
