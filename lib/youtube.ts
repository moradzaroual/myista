/**
 * Converts a YouTube playlist or video URL (whatever format is pasted
 * into the Resources/PlaylistVideos sheet) into the correct
 * YouTube embed <iframe> src.
 *
 * Supports:
 * - Playlist:  https://www.youtube.com/playlist?list=PLxxxxxxxx
 * - Video:     https://www.youtube.com/watch?v=xxxxxxxxxxx
 * - Short link: https://youtu.be/xxxxxxxxxxx
 */
export function getYoutubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);

    // Standard video URL: ?v=xxxx (checked before ?list= so a video
    // link that also carries a &list= param — like the ones in your
    // PlaylistVideos sheet — still embeds as the single video, not
    // the whole playlist).
    const videoId = parsed.searchParams.get("v");
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Playlist-only URL: ?list=PLxxxx
    const listId = parsed.searchParams.get("list");
    if (listId) {
      return `https://www.youtube.com/embed/videoseries?list=${listId}`;
    }

    // Short link: youtu.be/xxxx
    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.replace("/", "");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Extracts the raw video ID from a YouTube URL (same formats as above).
 * Used to build thumbnail URLs without needing a separate sheet column.
 */
export function getYoutubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);

    const videoId = parsed.searchParams.get("v");
    if (videoId) return videoId;

    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.replace("/", "");
      if (id) return id;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * YouTube auto-generates a thumbnail for every video ID at this path —
 * no need to store thumbnail links manually for individual videos.
 */
export function getYoutubeThumbnailUrl(url: string): string | null {
  const id = getYoutubeVideoId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}