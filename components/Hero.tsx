"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import localFont from "next/font/local";
import { SearchBar } from "@/components/SearchBar";

const canela = localFont({
  src: "../app/fonts/Canela-RegularItalic.ttf",
  weight: "400",
  style: "italic",
});

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Fading grid background — pure CSS, no image asset. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundColor: "#ffffff",
          backgroundImage: `
            repeating-linear-gradient(
              to right,
              rgba(15, 23, 42, 0.06) 0,
              rgba(15, 23, 42, 0.06) 1px,
              transparent 1px,
              transparent 64px
            ),
            repeating-linear-gradient(
              to bottom,
              rgba(15, 23, 42, 0.06) 0,
              rgba(15, 23, 42, 0.06) 1px,
              transparent 1px,
              transparent 64px
            )
          `,
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 85%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-4xl font-bold tracking-tight text-[--color-foreground] sm:text-5xl"
        >
          Toutes{" "}
          <span className={`${canela.className} font-normal not-italic italic`}>
          LES RESSOURCES
          </span>{" "}
          <br className="hidden sm:block" /> au même endroit.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="mx-auto mt-4 max-w-xl text-base text-[--color-muted-foreground]"
        >
          PDFs, supports de cours, vidéos et articles — organisés par module.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="mt-8"
        >
          <SearchBar />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          className="mt-6"
        >
          <Link
            href="/departments"
            className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-lg bg-[--color-primary] px-5 text-sm font-semibold text-[--color-on-primary] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Parcourir les départements
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}