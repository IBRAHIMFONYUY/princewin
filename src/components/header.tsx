import { Crown } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Crown className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline text-primary">
            PrinceWin
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden text-sm font-medium md:block">
            Balance:{" "}
            <span className="font-bold text-primary">0.002 BTC</span>
          </div>
          <ThemeToggle />
           <Avatar>
              <AvatarImage src="https://picsum.photos/seed/user/100/100" alt="User" data-ai-hint="avatar person" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
        </div>
      </div>
    </header>
  );
}
