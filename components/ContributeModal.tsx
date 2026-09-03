"use client";

import { useEffect, useState } from "react";
import { Plus, X, Loader2, CheckCircle2 } from "lucide-react";

interface Department {
  id: string;
  name: string;
}

interface Module {
  id: string;
  department_id: string;
  title: string;
}

export function ContributeButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Contribuer une ressource"
        title="Contribuer une ressource"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[--color-primary] text-[--color-on-primary] shadow-lg transition-transform hover:scale-105 hover:opacity-90"
      >
        <Plus className="h-6 w-6" aria-hidden="true" />
      </button>

      {isOpen && <ContributeModal onClose={() => setIsOpen(false)} />}
    </>
  );
}

function ContributeModal({ onClose }: { onClose: () => void }) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [loadingMeta, setLoadingMeta] = useState(true);

  const [title, setTitle] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [moduleId, setModuleId] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch("/api/study-meta")
      .then((res) => res.json())
      .then((data) => {
        setDepartments(data.departments);
        setModules(data.modules);
      })
      .finally(() => setLoadingMeta(false));
  }, []);

  const filteredModules = modules.filter(
    (m) => String(m.department_id) === String(departmentId)
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !moduleId || !file) return;

    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("moduleId", moduleId);
    formData.append("author", author);
    formData.append("file", file);

    try {
      const res = await fetch("/api/contribute", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Une erreur est survenue.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Impossible de contacter le serveur.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="flex max-h-[90vh] w-full max-w-md flex-col rounded-xl bg-[--color-card] p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-[--color-card-foreground]">
            Contribuer une ressource
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="cursor-pointer rounded-lg p-1.5 text-[--color-muted-foreground] hover:bg-[--color-muted]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {status === "success" ? (
          <div className="mt-6 flex flex-col items-center gap-2 py-6 text-center">
            <CheckCircle2 className="h-10 w-10 text-green-600" aria-hidden="true" />
            <p className="text-sm font-medium text-[--color-card-foreground]">
              Merci ! Votre ressource a été ajoutée.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 cursor-pointer rounded-lg bg-[--color-primary] px-4 py-2 text-sm font-semibold text-[--color-on-primary]"
            >
              Fermer
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col gap-3 overflow-y-auto pr-1"
          >
            <div>
              <label className="text-xs font-medium text-[--color-muted-foreground]">
                Titre
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[--color-border] bg-[--color-background] px-3 py-2 text-sm text-[--color-foreground]"
                placeholder="Ex: Résumé du chapitre 3"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[--color-muted-foreground]">
                Département
              </label>
              <select
                required
                disabled={loadingMeta}
                value={departmentId}
                onChange={(e) => {
                  setDepartmentId(e.target.value);
                  setModuleId("");
                }}
                className="mt-1 w-full rounded-lg border border-[--color-border] bg-[--color-background] px-3 py-2 text-sm text-[--color-foreground]"
              >
                <option value="">Choisir un département</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-[--color-muted-foreground]">
                Module
              </label>
              <select
                required
                disabled={!departmentId}
                value={moduleId}
                onChange={(e) => setModuleId(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[--color-border] bg-[--color-background] px-3 py-2 text-sm text-[--color-foreground] disabled:opacity-50"
              >
                <option value="">Choisir un module</option>
                {filteredModules.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-[--color-muted-foreground]">
                Votre nom (optionnel)
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[--color-border] bg-[--color-background] px-3 py-2 text-sm text-[--color-foreground]"
                placeholder="Ex: Ahmed B."
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[--color-muted-foreground]">
                Fichier (PDF, PPT, PPTX)
              </label>
              <input
                type="file"
                required
                accept=".pdf,.ppt,.pptx"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="mt-1 w-full text-sm text-[--color-foreground]"
              />
            </div>

            {status === "error" && (
              <p className="text-xs font-medium text-red-600">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[--color-primary] text-sm font-semibold text-[--color-on-primary] transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Envoi en cours...
                </>
              ) : (
                "Envoyer"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}