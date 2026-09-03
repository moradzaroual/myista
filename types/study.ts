export type ResourceType = "pdf" | "slides" | "examens" | "blog";

export interface Department {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon: string | null; // lucide icon name, e.g. "TrendingUp"
}

export interface Module {
  id: string;
  department_id: string;
  title: string;
  description: string | null;
  semester: string | null;
}

export interface Resource {
  id: string;
  module_id: string;
  title: string;
  description: string | null;
  type: ResourceType;
  file_url: string | null; // Google Drive link (pdf/slides, or uploaded video)
  external_url: string | null; // e.g. YouTube/Vimeo embed link
  thumbnail_url: string | null;
  author: string | null;
  created_at: string;
  downloads_count: number;
  views_count: number;
}

// Aggregate shape returned by the department/module listing queries —
// counts derived from the static data in data/studyData.ts.
export interface DepartmentWithCounts extends Department {
  moduleCount: number;
  resourceCount: number;
}

export interface ModuleWithFormatCounts extends Module {
  counts: Record<ResourceType, number>;
  totalCount: number;
}

// --- Video playlists ---
// Backed by two separate Google Sheet tabs (Playlists + PlaylistVideos),
// kept apart from Resource on purpose.

export interface Playlist {
  id: string;
  title: string;
  channel_name: string;
  thumbnail_url: string;
}

export interface PlaylistVideo {
  id: string;
  playlist_id: string; // matches Playlist.id
  title: string;
  description: string | null;
  video_url: string; // individual YouTube video URL
  order: number; // position within the playlist
}