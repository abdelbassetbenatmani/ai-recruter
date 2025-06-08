"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Coins } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CreditDisplay() {
  const credits = useQuery(api.credits.getUserCredits);


  return (
    <div className="flex items-center">
      <div className="mr-2 bg-primary/10 px-2 py-1 rounded-md flex items-center">
        <Coins className="h-4 w-4 text-primary mr-1" />
        <span className="text-sm font-medium">{credits ?? 0}</span>
      </div>
      <Link href="/dashboard/billing">
        <Button size="sm" variant="outline">
          Buy Credits
        </Button>
      </Link>
    </div>
  );
}
