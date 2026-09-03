import { getDepartmentsWithCounts } from "@/lib/study-queries";
import { Navbar } from "@/components/Navbar";
import { DepartmentCard } from "@/components/DepartmentCard";

export default async function DepartmentsIndexPage() {
  const departments = await getDepartmentsWithCounts();

  return (
    <div className="min-h-screen bg-[--color-background]">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold text-[--color-foreground]">
          Tous les départements
        </h1>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((department, index) => (
            <DepartmentCard key={department.id} department={department} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}