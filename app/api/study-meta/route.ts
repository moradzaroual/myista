import { NextResponse } from "next/server";
import { fetchDepartments, fetchModules } from "@/lib/getStudyData";

// Small server-side endpoint the contribute form calls to populate
// the Department / Module dropdowns without exposing your Sheet.best
// URLs directly to the browser.
export async function GET() {
  const [departments, modules] = await Promise.all([
    fetchDepartments(),
    fetchModules(),
  ]);

  return NextResponse.json({ departments, modules });
}
