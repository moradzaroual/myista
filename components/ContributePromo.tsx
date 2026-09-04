"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ImageIcon, Sparkles } from "lucide-react";
import { ContributeModal } from "@/components/ContributeModal";

const DISMISS_KEY = "myista_contribute_promo_dismissed";
const SHOW_DELAY_MS = 4000;

export function ContributePromo() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const alreadyDismissed = sessionStorage.getItem(DISMISS_KEY);
    if (alreadyDismissed) return;

    const timer = setTimeout(() => setIsVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  function handleDismiss() {
    setIsVisible(false);
    sessionStorage.setItem(DISMISS_KEY, "1");
  }

  function handleContributeClick() {
    setIsVisible(false);
    sessionStorage.setItem(DISMISS_KEY, "1");
    setIsFormOpen(true);
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 overflow-hidden rounded-2xl border border-[--color-border] bg-[--color-card] shadow-2xl sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-lg sm:translate-x-0"
          >
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Fermer"
              className="absolute right-2.5 top-2.5 z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-black/10 text-white transition-colors hover:bg-black/20 sm:text-[--color-muted-foreground] sm:bg-[--color-muted] sm:hover:bg-[--color-border]"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>

            <div className="grid grid-cols-2">
              {/* Left column — call to action */}
              <div className="col-span-2 flex flex-col justify-center gap-2.5 bg-[--color-primary] px-5 py-5 sm:col-span-1">
                <span className="inline-flex w-fit items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-[--color-on-primary]">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  Communauté
                </span>
                <h3 className="text-base font-bold leading-snug text-[--color-on-primary] sm:text-lg">
                  Aide tes camarades — partage tes ressources.
                </h3>
                <p className="text-xs leading-relaxed text-[--color-on-primary]/85">
                  Un PDF, un slide, un résumé ? Chaque contribution enrichit
                  MYISTA pour toute la promotion.
                </p>
                <button
                  type="button"
                  onClick={handleContributeClick}
                  className="mt-1 w-fit cursor-pointer rounded-lg bg-[--color-on-primary] px-3.5 py-2 text-xs font-semibold text-[--color-primary] transition-opacity hover:opacity-90"
                >
                  Contribuer maintenant
                </button>
              </div>

              {/* Right column — image placeholder, swap the div below for a real <img> */}
              <div className="relative col-span-2 hidden min-h-[140px] sm:col-span-1 sm:block">
                {/*
                  Replace this placeholder block with:
                  <img src="https://images.pexels.com/photos/6289171/pexels-photo-6289171.jpeg?cs=tinysrgb&dpr=1&w=500" alt="" className="h-full w-full object-cover" />
                */}
                <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-[--color-muted] text-[--color-muted-foreground]">
                  <ImageIcon className="h-6 w-6" aria-hidden="true" />
                  <span className="text-[10px] font-medium">Image ici</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isFormOpen && <ContributeModal onClose={() => setIsFormOpen(false)} />}
    </>
  );
}
