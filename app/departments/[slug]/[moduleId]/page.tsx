import { notFound } from "next/navigation";
import {
  getDepartmentBySlug,
  getModuleById,
  getModuleResources,
} from "@/lib/study-queries";
import { Navbar } from "@/components/Navbar";
import { ModuleResourcesClient } from "@/components/ModuleResourcesClient";

interface ModulePageProps {
  params: Promise<{ slug: string; moduleId: string }>;
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { slug, moduleId } = await params;

  const department = await getDepartmentBySlug(slug);
  const mod = await getModuleById(moduleId);

  if (!department || !mod || mod.department_id !== department.id) notFound();

  const resources = await getModuleResources(mod.id);

  return (
    <div className="min-h-screen bg-[--color-background]">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-sm font-medium text-[--color-primary]">
          {department.name}
          {mod.semester && ` · ${mod.semester}`}
        </p>
        <h1 className="mt-1 text-3xl font-bold text-[--color-foreground]">
          {mod.title}
        </h1>
        {mod.description && (
          <p className="mt-2 max-w-2xl text-sm text-[--color-muted-foreground]">
            {mod.description}
          </p>
        )}

        <div className="mt-8">
          <ModuleResourcesClient resources={resources} />
        </div>
      </div>
    </div>
  );
}