"use client";

import { motion } from "framer-motion";
import localFont from "next/font/local";

const canela = localFont({
  src: "../app/fonts/Canela-RegularItalic.ttf",
  weight: "400",
  style: "italic",
});

interface StudyStats {
  resourceCount: number;
  departmentCount: number;
  contributorCount: number;
  moduleCount: number;
}

export function StatsBar({ stats }: { stats: StudyStats }) {
  const items = [
    { value: stats.resourceCount, label: "Ressources disponibles" },
    { value: stats.departmentCount, label: "Filières couvertes" },
    { value: stats.contributorCount, label: "Contributeurs actifs" },
    { value: stats.moduleCount, label: "Modules référencés" },
  ];

  return (
    <div
      className="py-16"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 60%, #ffffff 100%)",
      }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-4 sm:grid-cols-4 sm:gap-y-0">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            className={`flex flex-col items-center text-center sm:px-6 ${
              i > 0 ? "sm:border-l sm:border-[#2D487C]/15" : ""
            }`}
          >
            <motion.span
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className={`${canela.className} cursor-default text-5xl not-italic italic text-[#0D9488] sm:text-6xl`}
            >
              {item.value}
            </motion.span>
            <span className="mt-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#2D487C] sm:text-xs">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}