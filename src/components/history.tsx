"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ProvablyFairModal } from "./provably-fair-modal";
import { useGame } from "@/context/game-provider";

export function History() {
  const { history } = useGame();
  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Crash</TableHead>
            <TableHead>Bet</TableHead>
            <TableHead>Profit</TableHead>
            <TableHead className="text-right">Verify</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Badge
                  variant={item.crashPoint < 2 ? "destructive" : "secondary"}
                  className={item.crashPoint >= 10 ? 'bg-primary text-primary-foreground' : item.crashPoint >=2 ? 'bg-green-500 text-white' : ''}
                >
                  {item.crashPoint.toFixed(2)}x
                </Badge>
              </TableCell>
              <TableCell>{item.bet.toFixed(2)}</TableCell>
              <TableCell className={item.result === 'win' ? 'text-green-500' : 'text-red-500'}>
                 {item.profit.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                <ProvablyFairModal
                  gameData={{
                    gameId: `game-${item.id}`,
                    serverSeed: `server-seed-${item.id}-hash`,
                    clientSeed: "your-client-seed",
                    nonce: item.id,
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
