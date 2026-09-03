"use client";

import { useState } from "react";
import { X, Loader2, CheckCircle2 } from "lucide-react";

// TODO: replace with your real Formspree form ID.
// Get one free at https://formspree.io — create a form there, point it
// at your email, and it gives you an ID like this to drop in below.
// Every submission to this URL lands directly in your inbox, no backend
// code needed on your side.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrpglzpr";

export function DemandeButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="cursor-pointer text-sm text-black/70 transition-colors hover:text-black"
      >
        Faire une demande
      </button>

      {isOpen && <DemandeModal onClose={() => setIsOpen(false)} />}
    </>
  );
}

function DemandeModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus("submitting");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-black">Faire une demande</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="cursor-pointer rounded-lg p-1.5 text-black/50 hover:bg-black/5"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {status === "success" ? (
          <div className="mt-6 flex flex-col items-center gap-2 py-6 text-center">
            <CheckCircle2 className="h-10 w-10 text-green-600" aria-hidden="true" />
            <p className="text-sm font-medium text-black">
              Merci, votre demande a été envoyée.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 cursor-pointer rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white"
            >
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
            <div>
              <label className="text-xs font-medium text-black/60">
                Votre nom (optionnel)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm text-black"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-black/60">
                Votre email (optionnel, pour qu'on vous réponde)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm text-black"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-black/60">
                Votre demande
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm text-black"
                placeholder="Signaler un problème, demander une ressource, poser une question..."
              />
            </div>

            {status === "error" && (
              <p className="text-xs font-medium text-red-600">
                Une erreur est survenue. Réessayez.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-black text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Envoi...
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
