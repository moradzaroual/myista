"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import type { Playlist } from "@/types/study";

interface PlaylistCardProps {
  playlist: Playlist;
  index?: number;
}

export function PlaylistCard({ playlist, index = 0 }: PlaylistCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, ease: "easeOut", delay: Math.min(index, 8) * 0.04 }}
    >
      <Link
        href={`/playlists/${playlist.id}`}
        className="group block overflow-hidden rounded-2xl border border-[--color-border] bg-[--color-card] transition-shadow hover:shadow-lg"
      >
        <div className="relative aspect-video w-full overflow-hidden">
          <img
            src={playlist.thumbnail_url}
            alt={playlist.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {/* Yellow-gradient play overlay, revealed on hover/touch */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-amber-400/85 via-amber-300/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <PlayCircle
              className="h-14 w-14 text-white drop-shadow-md transition-transform duration-300 group-hover:scale-110"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="p-4">
          <h4 className="line-clamp-2 text-sm font-semibold text-[--color-card-foreground]">
            {playlist.title}
          </h4>
          <p className="mt-1 text-xs text-[--color-muted-foreground]">
            {playlist.channel_name}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
