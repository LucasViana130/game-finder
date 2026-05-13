"use client";

import { ApiResponse } from "@/types/game";
import { GameCard } from "@/components/game-card";
import { Pagination } from "@/components/pagination";

interface GameListProps {
  data: ApiResponse;
}

export function GameList({ data }: GameListProps) {
  const games = data._embedded.gameList;
  const pageInfo = data.page;
  const links = data._links;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {pageInfo.totalPages > 1 && (
        <Pagination
          currentPage={pageInfo.number}
          totalPages={pageInfo.totalPages}
          links={links}
        />
      )}
    </>
  );
}
