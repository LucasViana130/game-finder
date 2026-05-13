export interface Genre {
  id: number;
  name: string;
}

export interface Platform {
  id: number;
  name: string;
}

export interface Link {
  href: string;
  title?: string;
}

export interface Links {
  self?: Link;
  "same-genre"?: Link;
  "same-platform"?: Link;
  [key: string]: Link | undefined;
}

export interface Game {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  rating: number;
  genre: Genre;
  platform: Platform;
  coverUrl: string;
  backdropUrl: string;
  _links?: Links;
}

export interface ApiResponse {
  _embedded: {
    gameList: Game[];
  };
  _links: {
    first?: Link;
    self?: Link;
    next?: Link;
    prev?: Link;
    last?: Link;
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
