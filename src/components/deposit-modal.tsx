"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function DepositModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  const handleDeposit = () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to deposit.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would trigger a payment gateway.
    toast({
      title: "Deposit Initiated",
      description: `Your deposit of ${parsedAmount.toFixed(2)} XAF is being processed.`,
    });
    setIsOpen(false);
    setAmount("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Deposit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Deposit Funds</DialogTitle>
          <DialogDescription>
            Add funds to your account using MTN Mobile Money or Orange Money.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (XAF)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="e.g., 5000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="text-xs text-muted-foreground space-y-2">
            <p><strong>NB:</strong> To complete the transaction, please approve the payment prompt sent to your mobile phone.</p>
            <p>Ensure your mobile money account has sufficient funds before proceeding.</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleDeposit}>Proceed to Deposit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
