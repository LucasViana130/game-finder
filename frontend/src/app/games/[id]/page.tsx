import { notFound } from "next/navigation";
import { fetchGameById } from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Calendar, Gamepad2, Monitor, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const game = await fetchGameById(Number(id));

  if (!game) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Backdrop Image */}
      <div className="relative h-[400px] w-full">
        <Image
          src={game.backdropUrl}
          alt={game.title}
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        
        {/* Back Button Overlay */}
        <div className="absolute top-4 left-4">
          <Link href="/">
            <Button variant="secondary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-[300px,1fr] gap-8">
              {/* Cover Image */}
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src={game.coverUrl}
                  alt={game.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Game Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{game.title}</h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-2xl font-semibold">{game.rating.toFixed(1)}</span>
                      <span className="text-muted-foreground">/ 10.0</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Description</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {game.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                        Release Date
                      </h3>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium">
                          {new Date(game.releaseDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                        Genre
                      </h3>
                      <div className="flex items-center gap-2">
                        <Gamepad2 className="h-4 w-4" />
                        <Badge variant="secondary" className="text-base">
                          {game.genre.name}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                        Platform
                      </h3>
                      <div className="flex items-center gap-2">
                        <Monitor className="h-4 w-4" />
                        <Badge variant="outline" className="text-base">
                          {game.platform.name}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
