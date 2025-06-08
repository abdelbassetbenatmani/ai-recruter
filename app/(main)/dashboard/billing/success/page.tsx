"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
  const router = useRouter();

  useEffect(() => {
    // You could verify the payment here if needed
  }, []);

  return (
    <div className="container max-w-md py-12 mx-auto">
      <Card>
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-center">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6">
            Your credits have been added to your account. You can now use them
            to conduct interviews.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => router.push("/credits")}>
              Buy More Credits
            </Button>
            <Button onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
