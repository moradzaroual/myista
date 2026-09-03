"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, X } from "lucide-react";
import { getYoutubeEmbedUrl, getYoutubeThumbnailUrl } from "@/lib/youtube";
import type { PlaylistVideo } from "@/types/study";

interface PlaylistVideoGridProps {
  videos: PlaylistVideo[];
}

export function PlaylistVideoGrid({ videos }: PlaylistVideoGridProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [descSide, setDescSide] = useState<"left" | "right">("right");
  const containerRef = useRef<HTMLDivElement>(null);

  const expandedVideo = videos.find((v) => v.id === expandedId) ?? null;

  function handleCardClick(video: PlaylistVideo, e: React.MouseEvent<HTMLElement>) {
    if (expandedId === video.id) return;

    // Pick whichever side (left/right of the clicked card, within the
    // grid) has more room, and put the description there.
    const container = containerRef.current;
    const card = e.currentTarget;
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const spaceLeft = cardRect.left - containerRect.left;
      const spaceRight = containerRect.right - cardRect.right;
      setDescSide(spaceRight >= spaceLeft ? "right" : "left");
    }
    setExpandedId(video.id);
  }

  return (
    <div ref={containerRef}>
      {/* Switching videos changes the `key`, which unmounts the old
          iframe (stopping playback) and mounts the new one (autoplay). */}
      <AnimatePresence mode="wait">
        {expandedVideo && (
          <ExpandedVideo
            key={expandedVideo.id}
            video={expandedVideo}
            descSide={descSide}
            onClose={() => setExpandedId(null)}
          />
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {videos.map((video) => {
          const isExpanded = video.id === expandedId;
          const thumbnailUrl = getYoutubeThumbnailUrl(video.video_url);
          return (
            <motion.button
              key={video.id}
              type="button"
              onClick={(e) => handleCardClick(video, e)}
              animate={{
                filter: expandedId && !isExpanded ? "blur(3px)" : "blur(0px)",
                opacity: expandedId && !isExpanded ? 0.55 : 1,
                scale: isExpanded ? 0 : 1,
              }}
              transition={{ duration: 0.25 }}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-[--color-border] bg-[--color-card] text-left"
              style={{ pointerEvents: isExpanded ? "none" : "auto" }}
            >
              <div className="relative aspect-video w-full overflow-hidden bg-black/5">
                {thumbnailUrl && (
                  <img
                    src={thumbnailUrl}
                    alt={video.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                  <PlayCircle
                    className="h-9 w-9 text-white opacity-0 drop-shadow-md transition-opacity group-hover:opacity-100"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div className="p-3">
                <h5 className="line-clamp-2 text-xs font-semibold text-[--color-card-foreground]">
                  {video.title}
                </h5>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function ExpandedVideo({
  video,
  descSide,
  onClose,
}: {
  video: PlaylistVideo;
  descSide: "left" | "right";
  onClose: () => void;
}) {
  const embedUrl = getYoutubeEmbedUrl(video.video_url);

  const player = (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[--color-border] bg-black">
      {embedUrl ? (
        <iframe
          src={`${embedUrl}${embedUrl.includes("?") ? "&" : "?"}autoplay=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <p className="flex h-full items-center justify-center text-sm text-white/70">
          Lien vidéo invalide ou non pris en charge.
        </p>
      )}
    </div>
  );

  const description = (
    <div className="flex flex-col justify-center">
      <h3 className="text-lg font-bold text-[--color-foreground]">{video.title}</h3>
      {video.description && (
        <p className="mt-2 text-sm text-[--color-muted-foreground]">
          {video.description}
        </p>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6 overflow-hidden"
    >
      <div className="relative grid grid-cols-1 gap-6 rounded-2xl border border-[--color-border] bg-[--color-card] p-4 md:grid-cols-2">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        {descSide === "right" ? (
          <>
            {player}
            {description}
          </>
        ) : (
          <>
            {description}
            {player}
          </>
        )}
      </div>
    </motion.div>
  );
}