'use client'

import { LayoutDashboard, ListTodo, Settings } from "lucide-react"
import { MenuItem } from "./MenuItem/MenuItem";
import { usePathname } from "next/navigation";

interface MenuBarProps {
  className?: string;
}


export const MenuBar = ({className}:MenuBarProps) => {

  const hiddenRoutes = ["/"]
  const pathname = usePathname();

  if (hiddenRoutes.includes(pathname) || pathname.startsWith("/questao")) {
    return null
  }

  return (
    <div className={`bg-background flex gap-2 items-center justify-center border-t-1 px-6 py-2 ${className}`}>
      <MenuItem 
        icon={<LayoutDashboard className="h-4 w-4 text-foreground" />}
        label="Painel"
        url="/"
      />
      <MenuItem 
        icon={<ListTodo className="h-4 w-4 text-foreground" />}
        label="Questões"
        url="/questoes"
      />
      <MenuItem 
        label="Flashcards"
        url="#" 
        hasShortly
      />
      <MenuItem 
        icon={<Settings className="h-4 w-4 text-foreground" />}
        label="Ajustes"
        url="/ajustes"
      />
    </div>
  )
}