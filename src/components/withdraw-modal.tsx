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
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Landmark } from "lucide-react";
import { useGame } from "@/context/game-provider";

type WithdrawModalProps = {
  isDropdown?: boolean;
};

export function WithdrawModal({ isDropdown = false }: WithdrawModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const { toast } = useToast();
  const { balance, setBalance } = useGame();

  const handleWithdraw = () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to withdraw.",
        variant: "destructive",
      });
      return;
    }

    if (parsedAmount > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You cannot withdraw more than your current balance.",
        variant: "destructive",
      });
      return;
    }
    
    if (!/^\d{9,15}$/.test(phone)) {
        toast({
            title: "Invalid Phone Number",
            description: "Please enter a valid phone number.",
            variant: "destructive",
        });
        return;
    }

    // In a real app, this would trigger a payment gateway.
    // Here, we just simulate the balance update.
    setBalance(prev => prev - parsedAmount);

    toast({
      title: "Withdrawal Successful",
      description: `${parsedAmount.toFixed(2)} XAF has been sent to ${phone}.`,
    });
    setIsOpen(false);
    setAmount("");
    setPhone("");
  };

  const Trigger = isDropdown ? (
    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
      <Landmark className="mr-2 h-4 w-4" />
      <span>Withdraw</span>
    </DropdownMenuItem>
  ) : (
    <Button>Withdraw</Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>
            Withdraw your winnings to your MTN Mobile Money or Orange Money account.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="withdraw-amount">Amount (XAF)</Label>
            <Input
              id="withdraw-amount"
              type="number"
              placeholder="e.g., 5000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
           <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="e.g., 67... or 69..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="text-xs text-muted-foreground space-y-2">
            <p>
              <strong>NB:</strong> Funds will be sent to the provided mobile money account. Please double-check the number.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleWithdraw}>Request Withdrawal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
