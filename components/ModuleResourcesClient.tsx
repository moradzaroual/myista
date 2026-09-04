"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ResourceCard } from "@/components/ResourceCard";
import type { Resource, ResourceType } from "@/types/study";

type FilterValue = "all" | ResourceType;

const TABS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pdf", label: "PDFs" },
  { value: "slides", label: "Slides" },
  { value: "examens", label: "Examens" },
  { value: "blog", label: "Articles" },
];

type SortValue = "newest" | "popular";

interface ModuleResourcesClientProps {
  resources: Resource[];
}

export function ModuleResourcesClient({ resources }: ModuleResourcesClientProps) {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [sort, setSort] = useState<SortValue>("newest");

  const visibleResources = useMemo(() => {
    const filtered =
      filter === "all" ? resources : resources.filter((r) => r.type === filter);

    return [...filtered].sort((a, b) =>
      sort === "newest"
        ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        : b.downloads_count + b.views_count - (a.downloads_count + a.views_count)
    );
  }, [resources, filter, sort]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Format tabs — flex-wrap so labels never clip at narrow widths */}
        <div
          role="tablist"
          aria-label="Filter by format"
          className="relative flex flex-wrap gap-1 rounded-lg bg-[--color-muted] p-1"
        >
          {TABS.map((tab) => {
            const isActive = filter === tab.value;
            return (
              <button
                key={tab.value}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setFilter(tab.value)}
                className="relative cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium text-[--color-muted-foreground] transition-colors focus:outline-none focus:ring-2 focus:ring-[--color-ring] data-[active=true]:text-[--color-foreground]"
                data-active={isActive}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-format-tab"
                    className="absolute inset-0 rounded-md bg-[--color-card] shadow-sm"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <label className="flex items-center gap-2 text-sm text-[--color-muted-foreground]">
          Sort by
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortValue)}
            className="h-9 cursor-pointer rounded-lg border border-[--color-border] bg-[--color-card] px-2 text-sm text-[--color-foreground] focus:outline-none focus:ring-2 focus:ring-[--color-ring]"
          >
            <option value="newest">Newest</option>
            <option value="popular">Most popular</option>
          </select>
        </label>
      </div>

      {visibleResources.length === 0 ? (
        <p className="mt-8 text-sm text-[--color-muted-foreground]">
          No resources in this format yet — try a different tab.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleResources.map((resource, index) => (
            <ResourceCard key={resource.id} resource={resource} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
