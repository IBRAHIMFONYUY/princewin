"use client";

import { Exchange } from "./icons";
import { SignInModal } from "./signin-modal";
import { SignUpModal } from "./signup-modal";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-full">
            <Exchange className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold font-headline text-primary">
            PrinceWin
          </h1>
        </div>
        <div className="flex items-center gap-2">
            <SignInModal />
            <SignUpModal />
        </div>
      </div>
    </header>
  );
}
