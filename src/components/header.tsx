"use client";

import { LogOut, MoreVertical, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Exchange } from "./icons";
import { DepositModal } from "./deposit-modal";
import { useGame } from "@/context/game-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AboutModal } from "./about-modal";
import { TermsModal } from "./terms-modal";
import { FaqModal } from "./faq-modal";
import { LanguageSwitcher } from "./language-switcher";

const translations = {
  english: {
    title: "PrinceWin",
    myAccount: "My Account",
    logout: "Logout",
  },
  french: {
    title: "PrinceGagner",
    myAccount: "Mon Compte",
    logout: "Déconnexion",
  },
  spanish: {
    title: "PríncipeGanar",
    myAccount: "Mi Cuenta",
    logout: "Cerrar Sesión",
  },
};

export function Header() {
  const { balance, language } = useGame();
  const t = translations[language];


  const handleLogout = () => {
    // In a real app, you would clear tokens and redirect
    console.log("User logged out");
    alert("Logged out!");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-full">
            <Exchange className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold font-headline text-primary">
            {t.title}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <DepositModal />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-sm font-medium border-primary/20 rounded-full px-4 py-2 h-auto"
              >
                <Wallet className="w-4 h-4 text-primary" />
                <span className="font-bold text-primary">
                  {balance.toFixed(2)} XAF
                </span>
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{t.myAccount}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="sm:hidden">
                <DepositModal isDropdown />
              </div>
              <FaqModal />
              <AboutModal />
              <TermsModal />
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t.logout}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
               <LanguageSwitcher />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
