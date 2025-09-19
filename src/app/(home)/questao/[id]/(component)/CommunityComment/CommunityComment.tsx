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
    <div className="flex flex-col gap-4 mt-4 max-h-[200px] overflow-y-auto">
      {users.map((user,index) => (
        <div key={index} className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>
                {user.userName?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex justify-between w-full">
              <div className="flex flex-col">
                <span className="font-semibold self-start">{user.userName}</span>
                <span className="text-xs text-muted-foreground self-start">
                  {user.commentDate}
                </span>
              </div>
              
              <Button variant={'ghost'} className="text-muted-foreground" onClick={openReportCommentModal} >
                <Flag />
              </Button>
            </div>
          </div>

          <div className="text-sm text-justify">{user.commentText}</div>

          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Contribua com um comentário"
              className="border rounded-md p-2 w-full focus:outline-none"
            />
            <Button variant="ghost">
              <Send />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )}
