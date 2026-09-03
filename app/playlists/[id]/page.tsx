import { notFound } from "next/navigation";
import Link from "next/link";
import { getPlaylistById, getVideosForPlaylist } from "@/lib/study-queries";
import { Navbar } from "@/components/Navbar";
import { PlaylistVideoGrid } from "@/components/PlaylistVideoGrid";

interface PlaylistPageProps {
  params: Promise<{ id: string }>;
}

export default async function PlaylistPage({ params }: PlaylistPageProps) {
  const { id } = await params;

  const playlist = await getPlaylistById(id);
  if (!playlist) notFound();

  const videos = await getVideosForPlaylist(id);

  return (
    <div className="min-h-screen bg-[--color-background]">
      <Navbar />

      <div className="mx-auto max-w-5xl px-4 py-10">
        <Link
          href="/"
          className="text-sm text-[--color-muted-foreground] hover:text-[--color-foreground]"
        >
          ← Retour
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-[--color-foreground]">
          {playlist.title}
        </h1>
        <p className="mt-1 text-sm text-[--color-muted-foreground]">
          {playlist.channel_name}
        </p>

        <div className="mt-8">
          <PlaylistVideoGrid videos={videos} />
        </div>
      </div>
    </div>
  );
}
