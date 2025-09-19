"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "How does the crash game work?",
        answer: "Players place a bet before the round starts. A multiplier begins at 1.00x and increases. Players must 'cash out' before the multiplier randomly 'crashes'. If you cash out in time, you win your bet multiplied by the cashout value. If you don't, you lose your bet."
    },
    {
        question: "Is the game fair?",
        answer: "Yes, our game uses a provably fair system. Each round's outcome is determined by a combination of a server seed, a client seed, and a nonce. You can independently verify the fairness of each game using the 'Verify' button in your history."
    },
    {
        question: "How do I deposit money?",
        answer: "You can deposit funds using MTN Mobile Money or Orange Money. Click the 'Deposit' button, enter the desired amount, and approve the transaction prompt on your mobile phone."
    },
    {
        question: "What is Auto Cashout?",
        answer: "Auto Cashout is a feature that allows you to set a specific multiplier at which the game will automatically cash out for you. This helps you secure winnings without having to click the button manually."
    },
    {
        question: "Are there any betting limits?",
        answer: "Yes, there is a minimum and maximum bet amount. These limits are displayed in the betting interface. You also cannot bet more than your current balance."
    }
]

export function FaqModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>FAQ</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Frequently Asked Questions</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
