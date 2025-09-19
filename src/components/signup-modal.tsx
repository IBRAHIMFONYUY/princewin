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
import Link from "next/link";

export function SignUpModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSignUp = () => {
    // In a real app, this would handle form submission and user creation
    toast({
      title: "Account Created!",
      description: "Welcome to PrinceWin! Please sign in.",
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Sign Up</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create an Account</DialogTitle>
          <DialogDescription>
            Join PrinceWin today to start playing.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email-signup">Email</Label>
            <Input id="email-signup" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password-signup">Password</Label>
            <Input id="password-signup" type="password" />
          </div>
           <div className="space-y-2">
            <Label htmlFor="confirm-password-signup">Confirm Password</Label>
            <Input id="confirm-password-signup" type="password" />
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
            <p className="text-sm text-muted-foreground">
                Already have an account? <Button variant="link" className="p-0 h-auto" onClick={() => setIsOpen(false)}>Sign In</Button>
            </p>
            <Link href="/game">
             <Button onClick={handleSignUp}>Sign Up</Button>
            </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
