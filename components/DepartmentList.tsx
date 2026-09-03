"use client";

import { useState } from "react";
import { DepartmentCard } from "@/components/DepartmentCard";
import type { DepartmentWithCounts } from "@/types/study";

const PAGE_SIZE = 4;

interface DepartmentListProps {
  departments: DepartmentWithCounts[];
}

export function DepartmentList({ departments }: DepartmentListProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visible = departments.slice(0, visibleCount);
  const hasMore = visibleCount < departments.length;

  return (
    <div>
      <div className="grid grid-cols-1 gap-x-10 border-t border-white/10 sm:grid-cols-2">
        {visible.map((department, index) => (
          <DepartmentCard key={department.id} department={department} index={index} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => Math.min(c + PAGE_SIZE, departments.length))}
            className="rounded-lg bg-[--color-primary] px-5 py-2.5 text-sm font-semibold text-[--color-on-primary] transition-opacity hover:opacity-90"
          >
            Départements suivants
          </button>
        </div>
      )}
    </div>
  );
}