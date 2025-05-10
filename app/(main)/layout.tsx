import { DashboardHeader } from "@/components/Dashboard/app-header";
import { AppSidebar } from "@/components/Dashboard/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-4 bg-background">
      <DashboardHeader  />
        <SidebarTrigger className="md:hidden"/>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
