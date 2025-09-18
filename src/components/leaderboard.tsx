import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockLeaderboard = [
  { username: "CryptoKing", profit: 250.75, multiplier: 12.54, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
  { username: "LuckyLuke", profit: 221.3, multiplier: 8.91, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d" },
  { username: "Satoshi", profit: 198.45, multiplier: 25.01, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d" },
  { username: "MoonRider", profit: 180.9, multiplier: 15.2, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026707d" },
  { username: "HighFlyer", profit: 155.0, multiplier: 5.1, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026708d" },
  { username: "BetGod", profit: 142.1, multiplier: 10.12, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026709d" },
  { username: "Winner22", profit: 130.5, multiplier: 3.45, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026710d" },
  { username: "CashQueen", profit: 115.8, multiplier: 1.99, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026711d" },
];

export function Leaderboard() {
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
          {mockLeaderboard.map((player) => (
            <TableRow key={player.username}>
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
