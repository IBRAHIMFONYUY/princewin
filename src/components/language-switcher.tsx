"use client";

import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { useGame, type Language } from "@/context/game-provider";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useGame();

  const handleLanguageChange = (value: string) => {
    setLanguage(value as Language);
  };

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Languages className="mr-2 h-4 w-4" />
        <span>Language</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuRadioGroup
          value={language}
          onValueChange={handleLanguageChange}
        >
          <DropdownMenuRadioItem value="english">English</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="french">Français</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="spanish">Español</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
