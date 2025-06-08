"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import CreditCheckDialog from "./CreditCheckDialog";

interface ICardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
}

const CreateCard = ({ title, description, icon: Icon, href }: ICardProps) => {
  const userCredits = useQuery(api.credits.getUserCredits);
  const hasEnoughCredits = userCredits !== undefined && userCredits > 0;

  return (
    <CreditCheckDialog>
      <Card
        className="w-full h-full cursor-pointer hover:shadow-md transition-all duration-300 border-2 hover:border-primary"
      >
        <Link
          href={hasEnoughCredits ? href : "#"}
          tabIndex={hasEnoughCredits ? 0 : -1}
          aria-disabled={!hasEnoughCredits}
          className="block h-full"
        >
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-3">
              <Icon className="text-white" />
            </div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm text-muted-foreground">
              {description}
            </CardDescription>
          </CardContent>
        </Link>
      </Card>
    </CreditCheckDialog>
  );
};

export default CreateCard;