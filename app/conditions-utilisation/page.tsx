import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const SECTIONS = [
  { id: "objet", label: "1. Objet" },
  { id: "acces", label: "2. Accès au service" },
  { id: "compte", label: "3. Compte utilisateur" },
  { id: "contributions", label: "4. Contributions et contenus déposés" },
  { id: "usage-autorise", label: "5. Usage autorisé" },
  { id: "propriete", label: "6. Propriété intellectuelle" },
  { id: "responsabilite", label: "7. Limitation de responsabilité" },
  { id: "suspension", label: "8. Suspension et suppression" },
  { id: "modification-cgu", label: "9. Modification des présentes conditions" },
  { id: "droit-applicable", label: "10. Droit applicable" },
  { id: "contact-cgu", label: "11. Contact" },
];

export default function TermsPage() {
  return (
    <div className="bg-[--color-background]">
      <Navbar />

      <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <p className="text-sm font-medium uppercase tracking-wide text-[--color-muted-foreground]">
          Conditions d'utilisation
        </p>
        <h1 className="mt-2 text-3xl font-bold text-[--color-foreground] sm:text-4xl">
          Conditions d'utilisation de MYISTA
        </h1>
        <p className="mt-4 text-sm text-[--color-muted-foreground]">
          Dernière mise à jour : [03 août 2026]
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
          <nav
            aria-label="Sommaire"
            className="h-fit rounded-2xl border border-[--color-border] bg-[--color-card] p-5 lg:sticky lg:top-24"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[--color-muted-foreground]">
              Sommaire
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-[--color-muted-foreground] transition-colors hover:text-[--color-primary]"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <article className="prose prose-sm sm:prose-base max-w-none text-[--color-foreground]">
            <p>
              En accédant à MYISTA et en l'utilisant, vous acceptez les
              présentes conditions d'utilisation. Si vous n'acceptez pas ces
              conditions, veuillez ne pas utiliser la plateforme.
            </p>

            <h2 id="objet" className="scroll-mt-24">
              1. Objet
            </h2>
            <p>
              MYISTA est une plateforme communautaire qui centralise des
              ressources pédagogiques (PDFs, slides, examens, articles)
              organisées par département, construite par et pour des
              étudiants.
            </p>

            <h2 id="acces" className="scroll-mt-24">
              2. Accès au service
            </h2>
            <p>
              L'accès à MYISTA est proposé « en l'état » et « selon
              disponibilité ». Nous nous efforçons d'assurer un accès continu
              mais ne garantissons pas une disponibilité ininterrompue du
              service.
            </p>

            <h2 id="compte" className="scroll-mt-24">
              3. Compte utilisateur
            </h2>
            <p>
              Si la création d'un compte est requise pour certaines
              fonctionnalités, vous vous engagez à fournir des informations
              exactes et à garder vos identifiants confidentiels. Vous êtes
              responsable de toute activité effectuée depuis votre compte.
            </p>

            <h2 id="contributions" className="scroll-mt-24">
              4. Contributions et contenus déposés
            </h2>
            <p>
              En déposant une ressource (PDF, slides, examen, article) sur
              MYISTA, vous garantissez que :
            </p>
            <ul>
              <li>Vous détenez les droits nécessaires pour partager ce contenu, ou que son partage à but pédagogique et non commercial est autorisé.</li>
              <li>Le contenu ne viole aucun droit d'auteur, droit à l'image, ou autre droit de tiers.</li>
              <li>Le contenu ne contient rien d'illégal, diffamatoire, ou nuisible.</li>
            </ul>
            <p>
              MYISTA se réserve le droit de modérer, refuser ou retirer tout
              contenu déposé, sans préavis, notamment en cas de signalement ou
              de non-respect de ces conditions.
            </p>

            <h2 id="usage-autorise" className="scroll-mt-24">
              5. Usage autorisé
            </h2>
            <p>Vous vous engagez à utiliser MYISTA uniquement à des fins pédagogiques légitimes. Sont notamment interdits :</p>
            <ul>
              <li>Le téléversement de contenu protégé par des droits que vous ne détenez pas et dont le partage n'est pas autorisé.</li>
              <li>Toute tentative de piratage, de surcharge du service, ou d'extraction automatisée massive des données du site (scraping) sans autorisation.</li>
              <li>L'usage de la plateforme à des fins commerciales non autorisées.</li>
            </ul>

            <h2 id="propriete" className="scroll-mt-24">
              6. Propriété intellectuelle
            </h2>
            <p>
              Le nom, le logo et l'interface de MYISTA sont la propriété de
              [MYISTA]. Les contenus déposés
              par les utilisateurs restent la propriété de leurs auteurs
              respectifs ; en les déposant, vous accordez à MYISTA une licence
              non exclusive pour les héberger, afficher et rendre accessibles
              aux autres utilisateurs de la plateforme à des fins pédagogiques.
            </p>

            <h2 id="responsabilite" className="scroll-mt-24">
              7. Limitation de responsabilité
            </h2>
            <p>
              Les ressources partagées sur MYISTA proviennent en grande partie
              de contributions étudiantes. Nous ne garantissons pas
              l'exactitude, l'exhaustivité ou l'actualité de ces contenus.
              MYISTA ne saurait être tenu responsable de l'usage fait de ces
              ressources ni des conséquences résultant de leur utilisation
              (notamment en contexte d'examen).
            </p>

            <h2 id="suspension" className="scroll-mt-24">
              8. Suspension et suppression
            </h2>
            <p>
              Nous nous réservons le droit de suspendre ou supprimer l'accès
              d'un utilisateur en cas de non-respect des présentes conditions,
              notamment en cas de dépôt de contenu illicite ou de comportement
              abusif.
            </p>

            <h2 id="modification-cgu" className="scroll-mt-24">
              9. Modification des présentes conditions
            </h2>
            <p>
              Ces conditions peuvent être modifiées à tout moment. La date de
              dernière mise à jour figure en haut de cette page. En continuant
              à utiliser MYISTA après une modification, vous acceptez les
              conditions révisées.
            </p>

            <h2 id="droit-applicable" className="scroll-mt-24">
              10. Droit applicable
            </h2>
            <p>
              Les présentes conditions sont régies par le droit [pays,
              ex. marocain]. Tout litige relatif à leur interprétation ou
              exécution relève de la compétence des tribunaux [ville/pays].
            </p>

            <h2 id="contact-cgu" className="scroll-mt-24">
              11. Contact
            </h2>
            <p>
              Pour toute question concernant ces conditions, contactez-nous à :{" "}
              <a href="mailto:myista@zohomail.com" className="text-[--color-primary]">
                myista@zohomail.com
              </a>
            </p>
          </article>
        </div>
      </div>

      
    </div>
  );
}