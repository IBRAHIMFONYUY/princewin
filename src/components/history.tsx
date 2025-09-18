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
  { id: 1, crashPoint: 2.34, players: 15, profit: 0.002 },
  { id: 2, crashPoint: 1.0, players: 12, profit: -0.001 },
  { id: 3, crashPoint: 10.12, players: 22, profit: 0.015 },
  { id: 4, crashPoint: 1.56, players: 18, profit: 0.001 },
  { id: 5, crashPoint: 3.45, players: 20, profit: 0.004 },
  { id: 6, crashPoint: 5.89, players: 25, profit: 0.008 },
  { id: 7, crashPoint: 1.21, players: 14, profit: -0.0005 },
  { id: 8, crashPoint: 1.99, players: 19, profit: 0.0018 },
  { id: 9, crashPoint: 25.01, players: 30, profit: 0.05 },
  { id: 10, crashPoint: 4.2, players: 21, profit: 0.006 },
];

export function History() {
  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Crash</TableHead>
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
