"use client";

import { useEffect, useState } from "react";

const LINES = [
  "// Une plateforme pour centraliser toutes les ressources étudiantes.",
  "// Construite par les étudiants, pour les étudiants.",
  "// PDFs, vidéos, slides et articles — réunis au même endroit.",
  "// Chaque contribution aide la promotion suivante.",
];

const TYPE_SPEED_MS = 45;
const DELETE_SPEED_MS = 22;
const PAUSE_AFTER_TYPED_MS = 1600;
const PAUSE_AFTER_DELETED_MS = 300;

export function TypewriterPanel() {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayed(LINES[0]);
      return;
    }

    const currentLine = LINES[lineIndex];

    if (phase === "typing") {
      if (displayed.length < currentLine.length) {
        const timeout = setTimeout(() => {
          setDisplayed(currentLine.slice(0, displayed.length + 1));
        }, TYPE_SPEED_MS);
        return () => clearTimeout(timeout);
      }
      const timeout = setTimeout(() => setPhase("pausing"), PAUSE_AFTER_TYPED_MS);
      return () => clearTimeout(timeout);
    }

    if (phase === "pausing") {
      const timeout = setTimeout(() => setPhase("deleting"), 0);
      return () => clearTimeout(timeout);
    }

    if (phase === "deleting") {
      if (displayed.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, DELETE_SPEED_MS);
        return () => clearTimeout(timeout);
      }
      const timeout = setTimeout(() => {
        setLineIndex((i) => (i + 1) % LINES.length);
        setPhase("typing");
      }, PAUSE_AFTER_DELETED_MS);
      return () => clearTimeout(timeout);
    }
  }, [displayed, phase, lineIndex, reducedMotion]);

  return (
    // Single dark glass panel — no outer "page" wrapper anymore, this
    // now sits directly as one bento tile among the others on the page.
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A100D]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#2BFFC0]/60" />
        <span className="ml-2 text-xs text-white/30">a-propos.ts</span>
      </div>

      <div className="flex flex-1 items-start p-6 font-mono text-sm leading-relaxed text-[#2BFFC0] sm:text-base">
        <span>
          {displayed}
          {!reducedMotion && (
            <span className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-[#2BFFC0] align-middle" />
          )}
        </span>
      </div>
    </div>
  );
}