import type { Department, Module, Resource, Playlist, PlaylistVideo } from "@/types/study";

const DEPARTMENTS_URL = process.env.SHEET_DEPARTMENTS_URL!;
const MODULES_URL = process.env.SHEET_MODULES_URL!;
const RESOURCES_URL = process.env.SHEET_RESOURCES_URL!;
const PLAYLISTS_URL = process.env.SHEET_PLAYLISTS_URL!;
const PLAYLIST_VIDEOS_URL = process.env.SHEET_PLAYLIST_VIDEOS_URL!;

export async function fetchDepartments(): Promise<Department[]> {
  const res = await fetch(DEPARTMENTS_URL, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch departments");
  return res.json();
}

export async function fetchModules(): Promise<Module[]> {
  const res = await fetch(MODULES_URL, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch modules");
  return res.json();
}

export async function fetchResources(): Promise<Resource[]> {
  const res = await fetch(RESOURCES_URL, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch resources");
  const raw = await res.json();

  // Google Sheets returns everything as strings — normalize types here
  return raw.map((r: any): Resource => ({
    id: r.id,
    module_id: r.module_id,
    title: r.title,
    description: r.description || null,
    type: r.type,
    file_url: r.file_url || null,
    external_url: r.external_url || null,
    thumbnail_url: r.thumbnail_url || null,
    author: r.author || null,
    downloads_count: Number(r.downloads_count) || 0,
    views_count: Number(r.views_count) || 0,
    created_at: r.created_at,
  }));
}

// --- Video playlists ---
// Separate sheet tabs (Playlists + PlaylistVideos), fetched separately
// and kept OUT of fetchAllStudyData() on purpose, per your call to keep
// the video data from getting mixed up with the resources data.

export async function fetchPlaylists(): Promise<Playlist[]> {
  const res = await fetch(PLAYLISTS_URL, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch playlists");
  const raw = await res.json();

  return raw.map((p: any): Playlist => ({
    id: p.id,
    title: p.title,
    channel_name: p.channel_name || "",
    thumbnail_url: p.thumbnail_url || "",
  }));
}

export async function fetchPlaylistVideos(): Promise<PlaylistVideo[]> {
  const res = await fetch(PLAYLIST_VIDEOS_URL, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch playlist videos");
  const raw = await res.json();

  return raw.map((v: any): PlaylistVideo => ({
    id: v.id,
    playlist_id: v.playlist_id,
    title: v.title,
    description: v.description || null,
    video_url: v.video_url,
    order: Number(v.order) || 0,
  }));
}

export async function fetchAllVideoData() {
  const [playlists, playlistVideos] = await Promise.all([
    fetchPlaylists(),
    fetchPlaylistVideos(),
  ]);
  return { playlists, playlistVideos };
}

// Fetches all 3 study tabs in parallel, once. Next.js caches/dedupes fetch()
// calls with the same URL+options during a single request, so calling
// this multiple times across your page tree is cheap.
export async function fetchAllStudyData() {
  const [departments, modules, resources] = await Promise.all([
    fetchDepartments(),
    fetchModules(),
    fetchResources(),
  ]);
  return { departments, modules, resources };
}