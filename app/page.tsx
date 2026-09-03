import {
  getDepartmentsWithCounts,
  getFeaturedResources,
  getFeaturedPlaylists,
  getSiteStats,
} from "@/lib/study-queries";
import { StatsBar } from "@/components/StatsBar";
import { Navbar } from "@/components/Navbar";
import { ContributeButton } from "@/components/ContributeModal"; // adjust path to match your project
import { Hero } from "@/components/Hero";
import { DepartmentCard } from "@/components/DepartmentCard";
import { ResourceCard } from "@/components/ResourceCard";
import { PlaylistCard } from "@/components/PlaylistCard";
import { Footer } from "@/components/Footer";

export default async function HomePage() {
  const departments = await getDepartmentsWithCounts();
  const featuredResources = await getFeaturedResources(6);
  const playlists = await getFeaturedPlaylists(3);
  const stats = await getSiteStats();
  return (
    <div className="min-h-screen bg-[--color-background]">
      <Navbar />
      <Hero />
      <ContributeButton />
      <StatsBar stats={stats} />
      {featuredResources.length > 0 && (
        <section className="py-12" style={{ background: "var(--color-section-alt-1)" }}>
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-xl font-bold text-[--color-foreground]">
              Ajoutés récemment
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredResources.map((resource, index) => (
                <ResourceCard key={resource.id} resource={resource} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {playlists.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-xl font-bold text-[--color-foreground]">Vidéos</h2>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {playlists.map((playlist, index) => (
                <PlaylistCard key={playlist.id} playlist={playlist} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[--color-section-alt-2] py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-xl font-bold text-[--color-foreground]">
            Parcourir par département
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((department, index) => (
              <DepartmentCard key={department.id} department={department} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}