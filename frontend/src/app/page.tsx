import { fetchGames } from "./actions";
import { GameList } from "@/components/game-list";

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "http://localhost:8080";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = params.page as string | undefined;
  
  let url: string | undefined;
  if (page) {
    url = `${API_URL}/games?page=${page}&size=6&sort=title,asc`;
  } else {
    url = `${API_URL}/games?page=0&size=6&sort=title,asc`;
  }
  
  const data = await fetchGames(url);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Game Finder</h1>
          <p className="text-muted-foreground">
            Discover your next favorite game
          </p>
        </header>

        <GameList data={data} />
      </div>
    </div>
  );
}
