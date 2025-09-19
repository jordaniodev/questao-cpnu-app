import { MenuItemProps } from "./MenuItem.type"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export const MenuItem = ({className, icon, label, url, hasShortly}: MenuItemProps) => {
  return (
    <Link href={url} className={`flex gap-2 flex-col md:flex-row md:h-6 text-foreground  px-2 py-4 items-center rounded-md bg-background border-none shadow-none hover:bg-sidebar-accent md:bg-sidebar-accent ${className}`}>
        {icon}
        <div className="flex gap-2 items-center">
            {hasShortly ? (
                <div className="flex flex-col gap-2 md:flex-row">
                    <Badge className="bg-sidebar-accent rounded-2xl h-4 px-3 py-1 text-muted-foreground">
                        <p className="font-medium text-[8px] text-muted-foreground">Em Breve</p>
                    </Badge>
                    <p className="text-muted-foreground text-xs font-medium">{label}</p>
                </div>
            ):(
                <p className="text-foreground text-xs font-medium">{label}</p>
            )}
        </div>
    </Link>
  ) 
}