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

interface ICardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
}

const CreateCard = ({ title, description, icon: Icon, href }: ICardProps) => {
  return (
    <Card className="w-full h-full cursor-pointer hover:shadow-md transition-all duration-300 border-2 hover:border-primary">
      <Link href={href}>
        <CardHeader className="">
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
  );
};

export default CreateCard;
