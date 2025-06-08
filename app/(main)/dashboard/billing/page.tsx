"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, CreditCard } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Load Stripe outside of component render
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

// Credit package options
const creditPackages = [
  { id: "basic", name: "Basic", credits: 10, price: 9.99 },
  { id: "standard", name: "Standard", credits: 25, price: 19.99 },
  { id: "premium", name: "Premium", credits: 60, price: 39.99 },
];

const CreditPurchaseForm = ({
  packageInfo,
  clientSecret,
  onClose,
}: {
  packageInfo: (typeof creditPackages)[0];
  clientSecret: string;
  onClose: () => void;
}) => {
  const [paymentIntentId, setPaymentIntentId] = useState<string>("");
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const addCredits = useMutation(api.credits.addCredits);

  useEffect(() => {
    // Extract payment intent ID from client secret
    if (clientSecret) {
      const parts = clientSecret.split("_secret_");
      if (parts.length > 0) {
        setPaymentIntentId(parts[0]);
      }
    }
  }, [clientSecret]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !paymentIntentId) return;

    setProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/dashboard/billing/success",
      },
      redirect: "if_required",
    });

    if (result.error) {
      toast("Payment failed: " + result.error.message);
      setProcessing(false);
    } else if (result.paymentIntent?.status === "succeeded") {
      // Add credits to user's account
      await addCredits({
        credits: packageInfo.credits,
        paymentId: paymentIntentId,
      });

      toast(`Successfully purchased ${packageInfo.credits} credits!`);

      setProcessing(false);
      onClose();

      //   delay for UI update
      setTimeout(() => {
        onClose();
        window.location.href = "/dashboard/billing/success";
      }, 1000);
      // Redirect to success page
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement
        options={{
          paymentMethodOrder: ["card"],
          defaultValues: {
            billingDetails: {
              name: "",
            },
          },
        }}
      />
      <Button
        type="submit"
        className="w-full mt-4"
        disabled={!stripe || processing}
      >
        {processing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          `Pay $${packageInfo.price}`
        )}
      </Button>
    </form>
  );
};

const PaymentDialog = ({
  isOpen,
  onOpenChange,
  selectedPackage,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPackage: (typeof creditPackages)[0];
}) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Create payment intent when dialog opens
  useEffect(() => {
    const createPaymentIntent = async () => {
      if (!isOpen || !selectedPackage) return;

      setIsLoading(true);
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: selectedPackage.price,
            credits: selectedPackage.credits,
          }),
        });

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
        toast("Failed to initialize payment. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [isOpen, selectedPackage]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Purchase Credits</DialogTitle>
          <DialogDescription>
            {selectedPackage.name} Package - {selectedPackage.credits} credits
            for ${selectedPackage.price}
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-2">Preparing payment options...</span>
          </div>
        ) : clientSecret ? (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret, appearance: { theme: "stripe" } }}
          >
            <CreditPurchaseForm
              packageInfo={selectedPackage}
              clientSecret={clientSecret}
              onClose={() => {
                onOpenChange(false);
                setClientSecret(null);
              }}
            />
          </Elements>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            Failed to load payment form. Please try again.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const CreditsPage = () => {
  const [selectedPackage, setSelectedPackage] = useState<
    (typeof creditPackages)[0] | null
  >(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const userCredits = useQuery(api.credits.getUserCredits);

  // Handle package selection and open dialog
  const handleSelectPackage = (pkg: (typeof creditPackages)[0]) => {
    setSelectedPackage(pkg);
    setDialogOpen(true);
  };

  return (
    <div className="container max-w-4xl py-12 mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Purchase Credits</h1>

      <div className="mb-10 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md text-center">
        <p className="text-lg">
          Your current balance:{" "}
          <span className="font-bold text-xl">{userCredits ?? 0} credits</span>
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Each interview costs 2 credits
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {creditPackages.map((pkg) => (
          <Card key={pkg.id} className="transition-shadow hover:shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{pkg.name} Plan</CardTitle>
              <CardDescription>
                {pkg.credits} credits for ${pkg.price}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold">${pkg.price}</span>
                <p className="text-sm text-muted-foreground">
                  ${(pkg.price / pkg.credits).toFixed(2)} per credit
                </p>
              </div>

              <div className="flex gap-3 items-center justify-center text-xs text-muted-foreground mb-6">
                <span className="flex items-center">
                  <CreditCard className="h-3 w-3 mr-1" /> Card
                </span>
                {/* <span className="flex items-center">
                  <ShoppingBag className="h-3 w-3 mr-1" /> Amazon Pay
                </span>
                <span className="flex items-center">
                  <DollarSign className="h-3 w-3 mr-1" /> Cash App
                </span> */}
              </div>

              <Button
                variant="default"
                className="w-full"
                onClick={() => handleSelectPackage(pkg)}
              >
                Purchase Now
              </Button>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground text-center">
              Purchase {pkg.credits} credits to conduct{" "}
              {Math.floor(pkg.credits / 2)} interviews
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedPackage && (
        <PaymentDialog
          isOpen={dialogOpen}
          onOpenChange={setDialogOpen}
          selectedPackage={selectedPackage}
        />
      )}
    </div>
  );
};

export default CreditsPage;
