import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { AppSidebar } from "@/components/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import Steps from "@/components/Steps";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        {/* <Steps /> */}
        <SidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
  );
};

export default Layout;
