"use client";

import React from "react";
import { tv } from "tailwind-variants";

const buttonStyles = tv({
  base: [
    "inline-flex items-center justify-center font-medium transition-all duration-300",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
  ],
  variants: {
    variant: {
      primary: [
        "bg-GREEN_60 text-ABSOLUTE_BLACK hover:bg-GREEN_50 hover:shadow-lg ",
      ],
      secondary: [
        "bg-GREY_30 text-ABSOLUTE_WHITE hover:bg-GREY_20 hover:shadow-lg ",
      ],
      outline: [
        "bg-transparent border border-GREEN_60 text-GREEN_60 hover:bg-GREEN_60/10 hover:shadow-lg ",
      ],
      secondaryOutline: [
        "bg-transparent border border-GREY_30 text-ABSOLUTE_WHITE hover:bg-GREY_30/10 hover:shadow-lg ",
      ],
      ghost: [
        "bg-transparent text-GREEN_60 hover:bg-GREEN_60/10 ",
      ],
    },
    size: {
      sm: "px-3 py-1.5 text-sm rounded",
      md: "px-4 py-2 text-base rounded-md",
      lg: "px-6 py-3 text-lg rounded-lg",
    },
    fullWidth: {
      true: "w-full",
      false: "w-auto",
    },
    display: {
      mobile: "block md:hidden",
      desktop: "hidden md:block",
      always: "block",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    fullWidth: false,
    display: "always",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "secondaryOutline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  display?: "mobile" | "desktop" | "always";
  children: React.ReactNode;
}

export function Button({
  variant,
  size,
  fullWidth,
  display,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonStyles({ variant, size, fullWidth, display, className })}
      {...props}
    >
      {children}
    </button>
  );
}