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

export function SignInModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSignIn = () => {
    // In a real app, this would handle form submission and authentication
    toast({
      title: "Signed In",
      description: "Welcome back!",
    });
    setIsOpen(false);
    // You would typically redirect the user to the game page here
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Sign In</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            Enter your credentials to access your account.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
           <p className="text-sm text-muted-foreground">
             Don't have an account? <Button variant="link" className="p-0 h-auto" onClick={() => setIsOpen(false)}>Sign Up</Button>
           </p>
          <Link href="/game">
            <Button onClick={handleSignIn}>Sign In</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
