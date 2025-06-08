"use client";
import React, { useState, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Coins } from "lucide-react";
import { useRouter } from "next/navigation";

interface CreditCheckDialogProps {
  children: ReactNode;
  requiredCredits?: number;
  onProceed?: () => void;
}

const CreditCheckDialog = ({
  children,
  requiredCredits = 2,
  onProceed,
}: CreditCheckDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const userCredits = useQuery(api.credits.getUserCredits);
  const router = useRouter();

  // Check if user has enough credits
  const hasEnoughCredits = 
    userCredits !== undefined && userCredits >= requiredCredits;

  const handleAction = (e: React.MouseEvent) => {
    if (!hasEnoughCredits) {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(true);
      return false;
    }
    
    if (onProceed) {
      onProceed();
    }
    return true;
  };

  const handleBuyCredits = () => {
    setIsOpen(false);
    router.push("/dashboard/billing");
  };

  // Clone the child element and add the credit check handler
  const childWithHandler = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const typedChild = child as React.ReactElement<any>;
      return React.cloneElement(typedChild, {
        onClick: (e: React.MouseEvent) => {
          // Preserve the original onClick if it exists
          if (typeof typedChild.props.onClick === "function") {
            typedChild.props.onClick(e);
          }
          handleAction(e);
        },
      });
    }
    return child;
  });

  return (
    <>
      {childWithHandler}
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-amber-600">
              <Coins className="h-5 w-5" />
              Insufficient Credits
            </DialogTitle>
            <DialogDescription>
              You need at least {requiredCredits} credits for this action.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-md border border-amber-200 dark:border-amber-800 my-2">
            <p className="text-sm">
              Your current balance:{" "}
              <span className="font-bold">{userCredits ?? 0} credits</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Each interview costs {requiredCredits} credits
            </p>
          </div>
          <DialogFooter className="flex sm:justify-between gap-4 sm:gap-0">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleBuyCredits} className="gap-2">
              <Coins className="h-4 w-4" />
              Buy Credits
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreditCheckDialog;