import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-GREEN_50 text-ABSOLUTE_BLACK hover:bg-GREEN_50 hover:shadow-lg focus-visible:ring-GREEN_60/20 dark:bg-GREEN_50/10 dark:hover:bg-GREEN_50/20",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "bg-transparent border border-GREEN_60 text-GREEN_60 hover:bg-GREEN_60/10 hover:shadow-lg  focus-visible:ring-GREEN_60/20 dark:bg-GREEN_60/10 dark:hover:bg-GREEN_60/20",
        secondary:
          "bg-GREY_30 text-ABSOLUTE_WHITE hover:bg-GREY_20 hover:shadow-lg focus-visible:ring-GREY_30/20 dark:bg-GREY_30/10 dark:hover:bg-GREY_30/20",
        secondaryOutline:
          "bg-transparent border border-GREY_30 text-GREY_30 hover:bg-GREY_30/10 hover:shadow-lg focus-visible:ring-GREY_30/20 dark:bg-GREY_30/10 dark:hover:bg-GREY_30/20",
          ghost:
          "bg-transparent text-GREEN_60 hover:bg-GREEN_60/10 focus-visible:ring-GREEN_60/20 dark:bg-GREEN_60/10 dark:hover:bg-GREEN_60/20",
        link: "text-GREEN_60 hover:underline hover:underline-offset-2 focus-visible:ring-GREEN_60/20 dark:bg-GREEN_60/10 dark:hover:bg-GREEN_60/20",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
