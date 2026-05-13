"use server";

import { Game, ApiResponse } from "@/types/game";

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "http://localhost:8080";

export async function fetchGames(url?: string): Promise<ApiResponse> {
  try {
    const fullUrl = url || `${API_URL}/games`;
    const response = await fetch(fullUrl, {
      cache: "no-store", 
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.statusText}`);
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
}

export async function fetchGameById(id: number): Promise<Game | null> {
  try {
    const response = await fetch(`${API_URL}/games/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch game: ${response.statusText}`);
    }

    const game: Game = await response.json();
    return game;
  } catch (error) {
    console.error(`Error fetching game ${id}:`, error);
    return null;
  }
}

export async function fetchFromLink(url: string): Promise<ApiResponse> {
  try {
    const fullUrl = url.startsWith('http') ? url : `${API_URL}${url}`;
    
    const response = await fetch(fullUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from link: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data._embedded && data._embedded.gameList) {
      return data;
    }
    
    if (data.id) {
      return {
        _embedded: {
          gameList: [data]
        },
        _links: {},
        page: {
          size: 1,
          totalElements: 1,
          totalPages: 1,
          number: 0
        }
      };
    }
    
    if (Array.isArray(data)) {
      return {
        _embedded: {
          gameList: data
        },
        _links: {},
        page: {
          size: data.length,
          totalElements: data.length,
          totalPages: 1,
          number: 0
        }
      };
    }
    
    return {
      _embedded: {
        gameList: []
      },
      _links: {},
      page: {
        size: 0,
        totalElements: 0,
        totalPages: 0,
        number: 0
      }
    };
  } catch (error) {
    console.error(`Error fetching from link ${url}:`, error);
    return {
      _embedded: {
        gameList: []
      },
      _links: {},
      page: {
        size: 0,
        totalElements: 0,
        totalPages: 0,
        number: 0
      }
    };
  }
}
