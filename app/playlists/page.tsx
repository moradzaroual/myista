import { getAllPlaylists } from "@/lib/study-queries";
import { PlaylistCard } from "@/components/PlaylistCard";
import { Navbar } from "@/components/Navbar";

export default async function PlaylistsPage() {
  const playlists = await getAllPlaylists();

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold text-[--color-foreground]">Vidéos</h1>
        <p className="mt-1 text-sm text-[--color-muted-foreground]">
          Toutes les playlists disponibles
        </p>

        {playlists.length === 0 ? (
          <p className="mt-8 text-sm text-[--color-muted-foreground]">
            Aucune playlist disponible pour le moment.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {playlists.map((playlist, index) => (
              <PlaylistCard key={playlist.id} playlist={playlist} index={index} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}