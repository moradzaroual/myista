"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Search,
  FileText,
  Presentation,
  Video,
  Newspaper,
  ListVideo,
  PlayCircle,
} from "lucide-react";
import type { ResourceType } from "@/types/study";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string | null;
  href: string;
  kind: "resource" | "playlist" | "video";
  resourceType?: ResourceType;
}

const TYPE_ICON: Record<ResourceType, typeof FileText> = {
  pdf: FileText,
  slides: Presentation,
  examens: FileText,
  blog: Newspaper,
};

function iconFor(result: SearchResult) {
  if (result.kind === "playlist") return ListVideo;
  if (result.kind === "video") return PlayCircle;
  return TYPE_ICON[result.resourceType ?? "pdf"];
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    let cancelled = false;
    setIsSearching(true);

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
        if (!res.ok) throw new Error(`Search request failed: ${res.status}`);
        const data = await res.json();
        if (!cancelled) setResults(data.results ?? []);
      } catch (err) {
        console.error("Search failed:", err);
        if (!cancelled) setResults([]);
      } finally {
        if (!cancelled) setIsSearching(false);
      }
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-xl">
      <label htmlFor="global-search" className="sr-only">
        Search study resources
      </label>
      <div className="flex items-center gap-3 rounded-xl border border-[--color-border] bg-[--color-card] px-4 py-3 shadow-sm">
        <Search className="h-5 w-5 shrink-0 text-[--color-muted-foreground]" aria-hidden="true" />
        <input
          id="global-search"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search modules, PDFs, videos, articles…"
          className="w-full bg-transparent text-sm text-[--color-foreground] placeholder:text-[--color-muted-foreground] focus:outline-none"
        />
      </div>

      {isOpen && query.trim().length >= 2 && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-[--color-border] bg-[--color-card] shadow-lg">
          {isSearching ? (
            <div className="px-4 py-3 text-sm text-[--color-muted-foreground]">
              Recherche…
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-3 text-sm text-[--color-muted-foreground]">
              No results for &ldquo;{query}&rdquo; — try a broader term or
              browse departments instead.
            </div>
          ) : (
            <ul>
              {results.map((result) => {
                const Icon = iconFor(result);
                return (
                  <li key={result.id}>
                    <Link
                      href={result.href}
                      className="flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-[--color-foreground] transition-colors hover:bg-[--color-muted]"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="h-4 w-4 shrink-0 text-[--color-primary]" aria-hidden="true" />
                      <span className="flex min-w-0 flex-col">
                        <span className="truncate">{result.title}</span>
                        {result.subtitle && (
                          <span className="truncate text-xs text-[--color-muted-foreground]">
                            {result.subtitle}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}