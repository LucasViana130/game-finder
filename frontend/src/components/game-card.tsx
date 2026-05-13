import { Game } from "@/types/game";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Info, Gamepad2, Monitor } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface GameCardProps {
  game: Game;
}

function convertToRelativePath(url: string): string {
  if (url.startsWith('/')) return url;
  
  try {
    const urlObj = new URL(url);
    return urlObj.pathname;
  } catch {
    return url;
  }
}

export function GameCard({ game }: GameCardProps) {
  const selfLink = game._links?.self?.href 
    ? convertToRelativePath(game._links.self.href)
    : `/games/${game.id}`;
    
  const genreLink = game._links?.["same-genre"]?.href 
    ? convertToRelativePath(game._links["same-genre"].href)
    : `/genres/${game.genre.id}`;
    
  const platformLink = game._links?.["same-platform"]?.href 
    ? convertToRelativePath(game._links["same-platform"].href)
    : `/platforms/${game.platform.id}`;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={game.coverUrl}
          alt={game.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{game.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 flex-grow">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{game.rating.toFixed(1)}</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Gamepad2 className="h-3 w-3" />
            <Badge variant="secondary">{game.genre.name}</Badge>
          </div>
          <div className="flex items-center gap-1">
            <Monitor className="h-3 w-3" />
            <Badge variant="outline">{game.platform.name}</Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Link href={selfLink} className="w-full">
          <Button className="w-full" variant="default">
            <Info className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </Link>
        {game._links?.["same-genre"]?.href !== undefined && (
          <Link href={genreLink} className="w-full">
            <Button className="w-full" variant="outline" size="sm">
              <Gamepad2 className="h-4 w-4 mr-1" />
              {game._links["same-genre"]?.title || "Genre"}
            </Button>
          </Link>
        )}
        {game._links?.["same-platform"]?.href !== undefined && (
          <Link href={platformLink} className="w-full">
            <Button className="w-full" variant="outline" size="sm">
              <Monitor className="h-4 w-4 mr-1" />
              {game._links["same-platform"]?.title || "Platform"}
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
