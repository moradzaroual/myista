import { getAllResources } from "@/lib/study-queries";
import { Navbar } from "@/components/Navbar";
import { ResourceCard } from "@/components/ResourceCard";
import type { ResourceType } from "@/types/study";
import Link from "next/link";

const TABS: { label: string; value: ResourceType | "all" }[] = [
  { label: "Tout", value: "all" },
  { label: "PDF", value: "pdf" },
  { label: "Slides", value: "slides" },
  { label: "Examens", value: "examens" },
];

interface ResourcesPageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function ResourcesPage({ searchParams }: ResourcesPageProps) {
  const { type } = await searchParams;
  const activeType = (type as ResourceType) || undefined;

  const resources = await getAllResources(activeType);

  return (
    <div className="min-h-screen bg-[--color-background]">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold text-[--color-foreground]">
          Ressources
        </h1>
        <p className="mt-1 text-sm text-[--color-muted-foreground]">
          {resources.length} ressource{resources.length !== 1 ? "s" : ""}
        </p>

        {/* Filter tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const isActive = tab.value === "all" ? !activeType : activeType === tab.value;
            const href = tab.value === "all" ? "/resources" : `/resources?type=${tab.value}`;

            return (
              <Link
                key={tab.value}
                href={href}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[--color-primary] text-[--color-on-primary]"
                    : "bg-[--color-muted] text-[--color-muted-foreground] hover:text-[--color-foreground]"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        {/* Grid */}
        {resources.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource, index) => (
              <ResourceCard key={resource.id} resource={resource} index={index} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-sm text-[--color-muted-foreground]">
            Aucune ressource trouvée pour ce filtre.
          </p>
        )}
      </div>
    </div>
  );
}