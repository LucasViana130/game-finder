import { fetchFromLink } from "@/app/actions";
import { GameList } from "@/components/game-list";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function FilterPage({
  params,
  searchParams,
}: {
  params: Promise<{ path: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { path } = await params;
  const search = await searchParams;
  
  const fullPath = `/${path.join('/')}`;
  
  const data = await fetchFromLink(fullPath);
  const games = data._embedded.gameList;

  let filterType = "Filtered";
  let filterName = "";
  
  if (games.length > 0) {
    if (fullPath.includes('/genres/')) {
      filterType = "Genre";
      filterName = games[0].genre.name;
    } else if (fullPath.includes('/platforms/')) {
      filterType = "Platform";
      filterName = games[0].platform.name;
    }
  }

  const title = filterName ? `${filterName} Games` : `${filterType} Games`;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground">
            {games.length} {games.length === 1 ? "game" : "games"} found
          </p>
        </div>

        {games.length > 0 ? (
          <GameList data={data} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No games found for this filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
