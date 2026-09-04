"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { ContributeModal } from "@/components/ContributeModal";

const DISMISS_KEY = "myista_contribute_promo_dismissed";
const SHOW_DELAY_MS = 4000;

const PROMO_IMAGE_URL =
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjP8z77B6FK1Nu4JNENffrkmh3uhSjItWQSpy4Sblh39nfJs_Z-aULuSZij4FDPtBAde7zz6xgi27H0VXl-veXEYjxsMSmu2kacQ76-3sVnJlPqg3P-0HjYNjd6tVGg0Ycv1vg5kn8ew1FbZvSR7N_pZS0HLNFzzOGivbT1e-FN2bvmMDgJQf1MmPwl558/s1600/pexels-cottonbro-6539026.jpg";

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={handleDismiss}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xs overflow-hidden rounded-2xl border border-[--color-border] bg-[--color-card] shadow-2xl sm:max-w-md sm:grid sm:max-w-2xl sm:grid-cols-2"
            >
              <button
                type="button"
                onClick={handleDismiss}
                aria-label="Fermer"
                className="absolute right-2.5 top-2.5 z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-black/15 text-white transition-colors hover:bg-black/25"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>

              {/* Image */}
              <div className="relative h-32 w-full sm:order-2 sm:h-full sm:min-h-[220px]">
                <img
                  src={PROMO_IMAGE_URL}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Text + CTA */}
              <div className="flex flex-col justify-center gap-2.5 bg-[--color-primary] px-5 py-5 sm:order-1">
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isFormOpen && <ContributeModal onClose={() => setIsFormOpen(false)} />}
    </>
  );
}