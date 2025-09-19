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
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Info } from "lucide-react";

export function AboutModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Info className="mr-2 h-4 w-4" />
          <span>About</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>About PrinceWin</DialogTitle>
          <DialogDescription>
            High stakes, high rewards.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 text-sm text-muted-foreground">
            <p>Welcome to PrinceWin, the ultimate crash game experience where timing is everything. Our mission is to provide a thrilling, fair, and secure gaming environment for all our players.</p>
            <p>Place your bet, watch the multiplier climb, and cash out before the crash to win big. With our provably fair system, you can verify the integrity of every single game round.</p>
            <p>Good luck, and may the odds be ever in your favor!</p>
        </div>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
