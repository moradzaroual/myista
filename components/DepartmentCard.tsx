"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { DepartmentWithCounts } from "@/types/study";

interface DepartmentCardProps {
  department: DepartmentWithCounts;
  index?: number;
}

export function DepartmentCard({ department, index = 0 }: DepartmentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: "easeOut", delay: Math.min(index, 6) * 0.04 }}
      className="border-b border-white/10 last:border-b-0"
      style={{ backgroundColor: "#2DB359" }}
    >
      <Link
        href={`/departments/${department.slug}`}
        className="group grid cursor-pointer grid-cols-1 items-start gap-6 px-6 py-10 transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black sm:grid-cols-[1fr_auto]"
      >
        <div>
          <h3
            className="text-xl font-extrabold text-white sm:text-2xl"
            style={{ fontFamily: '"CroissantOne", sans-serif' }}
          >
            {department.name}
          </h3>

          <p className="mt-2 text-xs font-medium uppercase tracking-wide text-white/40">
            {department.moduleCount} module{department.moduleCount !== 1 && "s"}
            {" · "}
            {department.resourceCount} resource{department.resourceCount !== 1 && "s"}
          </p>

          {department.description && (
            <p className="mt-2 max-w-md text-sm text-white/60">
              {department.description}
            </p>
          )}
        </div>

        <ArrowUpRight
          className="h-5 w-5 shrink-0 self-center text-white/50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
          aria-hidden="true"
        />
      </Link>
    </motion.div>
  );
}