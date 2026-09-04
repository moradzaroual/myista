import { fetchAllStudyData, fetchAllVideoData } from "@/lib/getStudyData";
import type {
  DepartmentWithCounts,
  ModuleWithFormatCounts,
  Resource,
  ResourceType,
  Playlist,
  PlaylistVideo,
} from "@/types/study";

const RESOURCE_TYPES: ResourceType[] = ["pdf", "slides", "examens", "blog"];

function normalizeId(value: unknown): string {
  return String(value ?? "").trim().toLowerCase();
}

export async function getDepartmentsWithCounts(): Promise<DepartmentWithCounts[]> {
  const { departments, modules, resources } = await fetchAllStudyData();

  return departments.map((dept) => {
    const deptModules = modules.filter(
      (m) => normalizeId(m.department_id) === normalizeId(dept.id)
    );
    const moduleIds = new Set(deptModules.map((m) => normalizeId(m.id)));
    const resourceCount = resources.filter((r) =>
      moduleIds.has(normalizeId(r.module_id))
    ).length;

    return {
      ...dept,
      moduleCount: deptModules.length,
      resourceCount,
    };
  });
}

export async function getDepartmentBySlug(slug: string) {
  const { departments } = await fetchAllStudyData();
  return departments.find((d) => normalizeId(d.slug) === normalizeId(slug)) ?? null;
}

export async function getModulesWithFormatCounts(
  departmentId: string
): Promise<ModuleWithFormatCounts[]> {
  const { modules, resources } = await fetchAllStudyData();

  return modules
    .filter((m) => normalizeId(m.department_id) === normalizeId(departmentId))
    .map((mod) => {
      const modResources = resources.filter(
        (r) => normalizeId(r.module_id) === normalizeId(mod.id)
      );
      const counts = Object.fromEntries(
        RESOURCE_TYPES.map((type) => [
          type,
          modResources.filter((r) => r.type === type).length,
        ])
      ) as Record<ResourceType, number>;

      return {
        ...mod,
        counts,
        totalCount: modResources.length,
      };
    });
}

export async function getModuleById(moduleId: string) {
  const { modules } = await fetchAllStudyData();
  return modules.find((m) => normalizeId(m.id) === normalizeId(moduleId)) ?? null;
}

export interface SiteStats {
  resourceCount: number;
  departmentCount: number;
  contributorCount: number;
  moduleCount: number;
}

export async function getSiteStats(): Promise<SiteStats> {
  const { departments, modules, resources } = await fetchAllStudyData();

  const contributors = new Set<string>();
  for (const resource of resources) {
    const author = (resource.author ?? "").trim();
    if (!author || author.toLowerCase() === "auteur inconnu") continue;
    contributors.add(author);
  }

  return {
    resourceCount: resources.length,
    departmentCount: departments.length,
    contributorCount: contributors.size,
    moduleCount: modules.length,
  };
}

export async function getFeaturedResources(limit = 6): Promise<Resource[]> {
  const { resources } = await fetchAllStudyData();
  return [...resources]
    .sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, limit);
}

export async function getResourceById(id: string): Promise<Resource | null> {
  const { resources } = await fetchAllStudyData();
  return resources.find((r) => normalizeId(r.id) === normalizeId(id)) ?? null;
}

export async function getModuleForResource(resource: Resource) {
  const { modules, departments } = await fetchAllStudyData();
  const mod =
    modules.find((m) => normalizeId(m.id) === normalizeId(resource.module_id)) ?? null;
  const department = mod
    ? departments.find((d) => normalizeId(d.id) === normalizeId(mod.department_id)) ?? null
    : null;
  return { module: mod, department };
}

export async function searchResources(term: string, limit = 6): Promise<Resource[]> {
  const needle = term.trim().toLowerCase();
  if (needle.length < 2) return [];

  const { resources } = await fetchAllStudyData();
  return resources
    .filter(
      (r) =>
        r.title.toLowerCase().includes(needle) ||
        r.description?.toLowerCase().includes(needle)
    )
    .slice(0, limit);
}
export async function getModuleResources(moduleId: string): Promise<Resource[]> {
  const { resources } = await fetchAllStudyData();
  return resources.filter(
    (r) => normalizeId(r.module_id) === normalizeId(moduleId)
  );
}

export async function getAllResources(type?: ResourceType): Promise<Resource[]> {
  const { resources } = await fetchAllStudyData();
  const filtered = type ? resources.filter((r) => r.type === type) : resources;
  return [...filtered].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function getAllPlaylists(): Promise<Playlist[]> {
  const { playlists } = await fetchAllVideoData();
  return playlists;
}

export async function getFeaturedPlaylists(limit = 3): Promise<Playlist[]> {
  const { playlists } = await fetchAllVideoData();
  return playlists.slice(0, limit);
}

export async function getPlaylistById(id: string): Promise<Playlist | null> {
  const { playlists } = await fetchAllVideoData();
  return playlists.find((p) => normalizeId(p.id) === normalizeId(id)) ?? null;
}

export async function getVideosForPlaylist(playlistId: string): Promise<PlaylistVideo[]> {
  const { playlistVideos } = await fetchAllVideoData();
  return playlistVideos
    .filter((v) => normalizeId(v.playlist_id) === normalizeId(playlistId))
    .sort((a, b) => a.order - b.order);
}

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string | null;
  href: string;
  kind: "resource" | "playlist" | "video";
  resourceType?: ResourceType;
}

export async function searchAll(term: string, limit = 8): Promise<SearchResult[]> {
  const needle = term.trim().toLowerCase();
  if (needle.length < 2) return [];

  const [{ resources }, { playlists, playlistVideos }] = await Promise.all([
    fetchAllStudyData(),
    fetchAllVideoData(),
  ]);

  const resourceResults: SearchResult[] = resources
    .filter(
      (r) =>
        r.title.toLowerCase().includes(needle) ||
        r.description?.toLowerCase().includes(needle)
    )
    .map((r) => ({
      id: `resource-${r.id}`,
      title: r.title,
      subtitle: r.author,
      href: `/resources/${r.id}`,
      kind: "resource" as const,
      resourceType: r.type,
    }));

  const playlistResults: SearchResult[] = playlists
    .filter(
      (p) =>
        p.title.toLowerCase().includes(needle) ||
        p.channel_name.toLowerCase().includes(needle)
    )
    .map((p) => ({
      id: `playlist-${p.id}`,
      title: p.title,
      subtitle: p.channel_name,
      href: `/playlists/${p.id}`,
      kind: "playlist" as const,
    }));

  const videoResults: SearchResult[] = playlistVideos
    .filter(
      (v) =>
        v.title.toLowerCase().includes(needle) ||
        v.description?.toLowerCase().includes(needle)
    )
    .map((v) => ({
      id: `video-${v.id}`,
      title: v.title,
      subtitle: "Vidéo",
      href: `/playlists/${v.playlist_id}`,
      kind: "video" as const,
    }));

  return [...resourceResults, ...playlistResults, ...videoResults].slice(0, limit);
}