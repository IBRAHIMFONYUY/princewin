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
import { FileText } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

export function TermsModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <FileText className="mr-2 h-4 w-4" />
          <span>Terms & Conditions</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Terms & Conditions</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-96 pr-6">
            <div className="space-y-4 py-4 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground">1. Introduction</h3>
                <p>These Terms and Conditions govern your use of the PrinceWin crash game. By playing, you agree to these terms in full. If you disagree with any part, you must not use our service.</p>

                <h3 className="font-bold text-foreground">2. Eligibility</h3>
                <p>You must be of legal gambling age in your jurisdiction to play. It is your responsibility to ensure you are not breaking any local laws.</p>
                
                <h3 className="font-bold text-foreground">3. Account Responsibility</h3>
                <p>You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>

                <h3 className="font-bold text-foreground">4. Gameplay</h3>
                <p>All game outcomes are determined by a provably fair algorithm. We are not responsible for any losses incurred during gameplay. Winnings are credited to your account balance immediately after a successful cashout.</p>

                <h3 className="font-bold text-foreground">5. Deposits and Withdrawals</h3>
                <p>Deposits are handled via third-party payment providers. We are not liable for any issues arising from their services. Withdrawals are subject to processing times and security checks.</p>

                <h3 className="font-bold text-foreground">6. Prohibited Activities</h3>
                <p>You may not use any bots, scripts, or other automated methods to play the game. Any fraudulent activity will result in immediate account termination and forfeiture of funds.</p>

                <h3 className="font-bold text-foreground">7. Limitation of Liability</h3>
                <p>Our service is provided "as is" without any warranties. We shall not be liable for any damages, including but not limited to loss of profits, data, or other intangible losses.</p>

                <h3 className="font-bold text-foreground">8. Changes to Terms</h3>
                <p>We reserve the right to modify these terms at any time. It is your responsibility to review them periodically.</p>
            </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
