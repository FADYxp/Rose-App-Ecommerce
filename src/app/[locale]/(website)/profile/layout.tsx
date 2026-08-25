import { SidebarProvider } from "@/components/ui/sidebar";
import { AccountSidebar } from "./_components/account-sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AccountSidebar />
      <main>{children}</main>
    </SidebarProvider>
  );
}
