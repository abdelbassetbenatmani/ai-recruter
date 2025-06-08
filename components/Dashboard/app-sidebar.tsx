"use client";
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
import CreditCheckDialog from "./CreditCheckDialog";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

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
    url: "/dashboard/all-interviews",
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
  const userCredits = useQuery(api.credits.getUserCredits);
  const hasEnoughCredits = userCredits !== undefined && userCredits > 0;
  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
        <CreditCheckDialog>
          <Button className="mt-8">
            <Link
              className="flex items-center gap-x-2"
              href={hasEnoughCredits ? "/dashboard/create-interview" : "#"}
              tabIndex={hasEnoughCredits ? 0 : -1}
              aria-disabled={!hasEnoughCredits}
            >
              <Plus /> <span>Create New Interview</span>
            </Link>
          </Button>
        </CreditCheckDialog>
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
