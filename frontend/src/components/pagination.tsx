"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import Link from "next/link";
import { Link as LinkType } from "@/types/game";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  links: {
    first?: LinkType;
    self?: LinkType;
    next?: LinkType;
    prev?: LinkType;
    last?: LinkType;
  };
}

function convertToRelativePath(url: string): string {
  if (url.startsWith('/')) return url;
  try {
    const urlObj = new URL(url);
    if (urlObj.pathname === '/games') {
      return `/${urlObj.search}`;
    }
    return urlObj.pathname + urlObj.search;
  } catch {
    return url;
  }
}

export function Pagination({
  currentPage,
  totalPages,
  links,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {/* First Page */}
      {links.first && currentPage > 0 && (
        <Link href={convertToRelativePath(links.first.href)}>
          <Button variant="outline" size="icon">
            <ChevronsLeft className="h-4 w-4" />
          </Button>
        </Link>
      )}
      
      {/* Previous Page */}
      {links.prev ? (
        <Link href={convertToRelativePath(links.prev.href)}>
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <Button variant="outline" size="icon" disabled>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
      
      {/* Page Info */}
      <div className="px-4 py-2 text-sm">
        Page {currentPage + 1} of {totalPages}
      </div>
      
      {/* Next Page */}
      {links.next ? (
        <Link href={convertToRelativePath(links.next.href)}>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <Button variant="outline" size="icon" disabled>
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
      
      {/* Last Page */}
      {links.last && currentPage < totalPages - 1 && (
        <Link href={convertToRelativePath(links.last.href)}>
          <Button variant="outline" size="icon">
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </Link>
      )}
    </div>
  );
}
