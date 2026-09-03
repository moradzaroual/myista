import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getDepartmentBySlug,
  getModulesWithFormatCounts,
} from "@/lib/study-queries";
import { Navbar } from "@/components/Navbar";

interface DepartmentPageProps {
  params: Promise<{ slug: string }>;
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
  const { slug } = await params;

  const department = await getDepartmentBySlug(slug);
  if (!department) notFound();

  const modules = await getModulesWithFormatCounts(department.id);

  return (
    <div className="min-h-screen bg-[--color-background]">
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 py-10">
        <p className="text-sm font-medium text-[--color-primary]">Department</p>
        <h1 className="mt-1 text-3xl font-bold text-[--color-foreground]">
          {department.name}
        </h1>
        {department.description && (
          <p className="mt-2 max-w-2xl text-sm text-[--color-muted-foreground]">
            {department.description}
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3">
          {modules.length === 0 ? (
            <p className="text-sm text-[--color-muted-foreground]">
              No modules published yet for this department.
            </p>
          ) : (
            modules.map((mod) => (
              <Link
                key={mod.id}
                href={`/departments/${department.slug}/${mod.id}`}
                className="group flex cursor-pointer flex-col gap-1 rounded-xl border border-[--color-border] bg-[--color-card] p-4 transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[--color-ring] sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="text-sm font-semibold text-[--color-card-foreground]">
                    {mod.title}
                  </h3>
                  {mod.description && (
                    <p className="mt-0.5 line-clamp-1 text-xs text-[--color-muted-foreground]">
                      {mod.description}
                    </p>
                  )}
                </div>
                <p className="mt-2 shrink-0 text-xs font-medium text-[--color-muted-foreground] sm:mt-0">
                  {mod.counts.pdf} PDFs · {mod.counts.examens} examens ·{" "}
                  {mod.counts.slides} slide decks · {mod.counts.blog} articles
                </p>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}