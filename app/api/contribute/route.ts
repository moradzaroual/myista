import { NextResponse } from "next/server";

const APPS_SCRIPT_UPLOAD_URL = process.env.APPS_SCRIPT_UPLOAD_URL!;
const RESOURCES_URL = process.env.SHEET_RESOURCES_URL!;

const EXTENSION_TYPE_MAP: Record<string, string> = {
  pdf: "pdf",
  ppt: "slides",
  pptx: "slides",
};

function getResourceType(fileName: string): string | null {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  return EXTENSION_TYPE_MAP[ext] ?? null;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const moduleId = formData.get("moduleId") as string;
    const author = (formData.get("author") as string) || "Contribution étudiante";
    const file = formData.get("file") as File | null;

    if (!title || !moduleId || !file) {
      return NextResponse.json(
        { error: "Titre, module et fichier sont requis." },
        { status: 400 }
      );
    }

    const resourceType = getResourceType(file.name);
    if (!resourceType) {
      return NextResponse.json(
        { error: "Format de fichier non supporté. Utilisez PDF, PPT ou PPTX." },
        { status: 400 }
      );
    }

    // 1. Upload the file to Google Drive via the Apps Script web app
    const arrayBuffer = await file.arrayBuffer();
    const base64Data = arrayBufferToBase64(arrayBuffer);

    const uploadRes = await fetch(APPS_SCRIPT_UPLOAD_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        fileName: file.name,
        mimeType: file.type || "application/octet-stream",
        fileData: base64Data,
      }),
    });

    const uploadResult = await uploadRes.json();
    if (uploadResult.error || !uploadResult.url) {
      return NextResponse.json(
        { error: `Échec de l'upload: ${uploadResult.error ?? "unknown error"}` },
        { status: 500 }
      );
    }

    // 2. Add a new row to the Resources sheet via Sheet.best
    const newRow = {
      id: `contrib-${Date.now()}`,
      module_id: moduleId,
      title,
      description: "",
      type: resourceType,
      file_url: uploadResult.url,
      external_url: "",
      thumbnail_url: "",
      author,
      downloads_count: 0,
      views_count: 0,
      created_at: new Date().toISOString(),
    };

    const sheetRes = await fetch(RESOURCES_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRow),
    });

    if (!sheetRes.ok) {
      // DEBUG: surface the real error from Sheet.best instead of hiding it
      const sheetErrorText = await sheetRes.text();
      console.error("Sheet.best write failed:", sheetRes.status, sheetErrorText);
      return NextResponse.json(
        {
          error: "Fichier uploadé mais échec de l'ajout à la base de données.",
          debug_status: sheetRes.status,
          debug_body: sheetErrorText,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, resource: newRow });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}