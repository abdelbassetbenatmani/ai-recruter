import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  CalendarCheck,
  CalendarDays,
  CalendarSync,
  CreditCard,
  Home,
  Plus,
  Settings,
} from "lucide-react";
import Link from "next/link";
import Logo from "../Logo";
import { Button } from "../ui/button";

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Completed Interviews",
    url: "/dashboard/completed-interviews",
    icon: CalendarCheck,
  },
  {
    title: "Scheduled Interviews",
    url: "/dashboard/scheduled-interviews",
    icon: CalendarSync,
  },
  {
    title: "All Interviews",
    url: "/dashboard/interviews",
    icon: CalendarDays,
  },
  {
    title: "Billing",
    url: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
        <Button className="mt-8">
          <Link
            className="flex items-center gap-x-2"
            href="/dashboard/create-interview"
          >
            <Plus /> <span>Create New Interview</span>
          </Link>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="py-5 text-base hover:bg-primary"
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
