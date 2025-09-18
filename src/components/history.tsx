import { ShieldCheck } from "lucide-react";
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

const mockHistory = [
  { id: 1, crashPoint: 2.34, bet: 10, profit: 13.4, result: "win" },
  { id: 2, crashPoint: 1.0, bet: 10, profit: -10, result: "loss" },
  { id: 3, crashPoint: 10.12, bet: 5, profit: 45.6, result: "win" },
  { id: 4, crashPoint: 1.56, bet: 20, profit: -20, result: "loss" },
  { id: 5, crashPoint: 3.45, bet: 15, profit: 36.75, result: "win" },
  { id: 6, crashPoint: 5.89, bet: 10, profit: -10, result: "loss" },
  { id: 7, crashPoint: 1.21, bet: 50, profit: -50, result: "loss" },
  { id: 8, crashPoint: 1.99, bet: 25, profit: 24.75, result: "win" },
  { id: 9, crashPoint: 25.01, bet: 2, profit: 48.02, result: "win" },
  { id: 10, crashPoint: 4.2, bet: 10, profit: -10, result: "loss" },
];

export function History() {
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
          {mockHistory.map((item) => (
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
