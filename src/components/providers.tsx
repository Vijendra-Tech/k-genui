//@ts-nocheck

import { SidebarProvider } from "../lib/hooks/use-sidebar";
import { TooltipProvider } from "./ui/tooltip";

export function Providers({ children, ...props }: any) {
  return (
    <SidebarProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </SidebarProvider>
  )
}
