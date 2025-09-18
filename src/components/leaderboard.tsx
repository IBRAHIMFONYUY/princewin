"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGame } from "@/context/game-provider";


export function Leaderboard() {
  const { leaderboard } = useGame();
  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Player</TableHead>
            <TableHead className="text-right">Profit (XAF)</TableHead>
            <TableHead className="text-right">Multiplier</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboard.map((player, index) => (
            <TableRow key={player.username + index}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={player.avatar} alt={player.username} />
                    <AvatarFallback>{player.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{player.username}</span>
                </div>
              </TableCell>
              <TableCell className="text-right font-bold text-green-500">
                {player.profit.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                {player.multiplier.toFixed(2)}x
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
