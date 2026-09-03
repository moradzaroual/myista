import { notFound } from "next/navigation";
import Link from "next/link";
import { getResourceById, getModuleForResource } from "@/lib/study-queries";
import { Navbar } from "@/components/Navbar";
import { ResourceCard } from "@/components/ResourceCard";

interface ResourcePageProps {
  params: Promise<{ id: string }>;
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { id } = await params;

  const resource = await getResourceById(id);
  if (!resource) notFound();

  const { module: mod, department } = await getModuleForResource(resource);

  return (
    <div className="min-h-screen bg-[--color-background]">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-10">
        {department && mod && (
          <nav className="mb-4 flex items-center gap-1.5 text-sm text-[--color-muted-foreground]">
            <Link href={`/departments/${department.slug}`} className="cursor-pointer hover:text-[--color-foreground]">
              {department.name}
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={`/departments/${department.slug}/${mod.id}`} className="cursor-pointer hover:text-[--color-foreground]">
              {mod.title}
            </Link>
          </nav>
        )}
        <ResourceCard resource={resource} />
      </div>
    </div>
  );
}