"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FileText,
  Presentation,
  Video,
  Newspaper,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import type { Resource, ResourceType } from "@/types/study";

interface FormatMeta {
  icon: LucideIcon;
  label: string;
  action: string;
}

const FORMAT_META: Record<ResourceType, FormatMeta> = {
  pdf: { icon: FileText, label: "PDF", action: "Ouvrir le PDF" },
  slides: { icon: Presentation, label: "Slides", action: "View slides" },
  examens: { icon: FileText, label: "examens", action: "Ouvrir les examens" },
  blog: { icon: Newspaper, label: "Article", action: "Read" },
};

// Single hover/accent color for every card, regardless of type.
const ACCENT = "#0D9488";

// How far each card drifts as the page scrolls (px). Varying it by
// column position — instead of every card moving identically — is
// what actually reads as "parallax" rather than a uniform scroll.
const PARALLAX_RANGE: [number, number][] = [
  [70, -70], // left column: moves more
  [35, -35], // middle column: moves less
  [70, -70], // right column: moves more
];

const PLACEHOLDER = "PASTE_GOOGLE_DRIVE_LINK_HERE";

interface ResourceCardProps {
  resource: Resource;
  index?: number;
}

export function ResourceCard({ resource, index = 0 }: ResourceCardProps) {
  const meta = FORMAT_META[resource.type];
  const Icon = meta.icon;
  const url = resource.external_url ?? resource.file_url;
  const isPlaceholder = !url || url === PLACEHOLDER;
  const hasThumbnail = !!resource.thumbnail_url;
  const orderLabel = String(index + 1).padStart(2, "0");

  // Scroll-linked parallax: as this card travels through the viewport
  // (from fully below it to fully above it), its own vertical offset
  // shifts across PARALLAX_RANGE — independent of the browser's scroll
  // speed, which is what gives the drifting parallax feel rather than
  // a fixed-duration entrance animation.
  const cardRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const range = PARALLAX_RANGE[index % 3];
  const y = useTransform(scrollYProgress, [0, 1], range);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ scale: 1.02 }}
      transition={{ opacity: { duration: 0.4, delay: Math.min(index, 8) * 0.04 } }}
      style={{ ["--accent" as string]: ACCENT, y }}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-[--color-border] bg-[--color-card] p-6 transition-colors duration-300 ease-out hover:border-transparent hover:bg-[var(--accent)]"
    >
      {hasThumbnail && (
        <div className="-mx-6 -mt-6 overflow-hidden">
          <img
            src={resource.thumbnail_url!}
            alt={resource.title}
            className="h-32 w-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)] transition-colors duration-300 group-hover:bg-white group-hover:text-[var(--accent)]">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      <div className="flex-1">
        <h4 className="text-lg font-bold text-[--color-card-foreground] transition-colors duration-300 group-hover:text-white">
          {resource.title}
        </h4>
        {resource.description && (
          <p className="mt-2 line-clamp-2 text-sm text-[--color-muted-foreground] transition-colors duration-300 group-hover:text-white/80">
            {resource.description}
          </p>
        )}
        {resource.author && (
          <p className="mt-2 text-xs text-[--color-muted-foreground] transition-colors duration-300 group-hover:text-white/70">
            {resource.author}
          </p>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-[--color-border] pt-4 transition-colors duration-300 group-hover:border-white/20">
        <span className="text-xs font-semibold uppercase tracking-widest text-[--color-muted-foreground] transition-colors duration-300 group-hover:text-white/70">
          {orderLabel} / {meta.label}
        </span>

        {isPlaceholder ? (
          <span
            title="Add the real Google Drive link in your Resources sheet"
            className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-full border border-[--color-border] text-[--color-muted-foreground] transition-colors duration-300 group-hover:border-white/40 group-hover:text-white/60"
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        ) : (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={meta.action}
            title={meta.action}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[--color-border] text-[--color-foreground] transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-[var(--accent)]"
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </motion.article>
  );
}