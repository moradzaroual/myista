import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const SECTIONS = [
  { id: "donnees-collectees", label: "1. Données collectées" },
  { id: "finalites", label: "2. Finalités du traitement" },
  { id: "base-legale", label: "3. Base légale" },
  { id: "cookies", label: "4. Cookies et traceurs" },
  { id: "partage", label: "5. Partage des données" },
  { id: "conservation", label: "6. Durée de conservation" },
  { id: "droits", label: "7. Vos droits" },
  { id: "securite", label: "8. Sécurité" },
  { id: "mineurs", label: "9. Mineurs" },
  { id: "modifications", label: "10. Modifications" },
  { id: "contact", label: "11. Contact" },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[--color-background]">
      <Navbar />

      <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <p className="text-sm font-medium uppercase tracking-wide text-[--color-muted-foreground]">
          Politique de confidentialité
        </p>
        <h1 className="mt-2 text-3xl font-bold text-[--color-foreground] sm:text-4xl">
          Politique de confidentialité de MYISTA
        </h1>
        <p className="mt-4 text-sm text-[--color-muted-foreground]">
          Dernière mise à jour : [03 août 2026]
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
          {/* Table of contents */}
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

          {/* Content */}
          <article className="prose prose-sm sm:prose-base max-w-none text-[--color-foreground]">
            <p>
              MYISTA (« nous », « notre », « la plateforme ») respecte votre vie
              privée. Cette politique explique quelles données nous collectons
              lorsque vous utilisez notre site, pourquoi nous les collectons, et
              quels sont vos droits. Elle s'applique à tous les visiteurs et
              utilisateurs de MYISTA.
            </p>

            <h2 id="donnees-collectees" className="scroll-mt-24">
              1. Données collectées
            </h2>
            <p>Selon votre usage du site, nous pouvons collecter :</p>
            <ul>
              <li>
                <strong>Données que vous nous fournissez directement</strong> :
                nom, adresse e-mail, département/filière, contenu des
                formulaires de contact ou de contribution de ressources.
              </li>
              <li>
                <strong>Données techniques automatiques</strong> : adresse IP,
                type de navigateur, pages visitées, durée de visite, via des
                outils de mesure d'audience (voir section Cookies).
              </li>
              <li>
                <strong>Contenus déposés</strong> : fichiers (PDF, slides,
                examens) que vous téléversez sur la plateforme, ainsi que les
                métadonnées associées (titre, département, date).
              </li>
            </ul>

            <h2 id="finalites" className="scroll-mt-24">
              2. Finalités du traitement
            </h2>
            <p>Nous utilisons vos données pour :</p>
            <ul>
              <li>Fournir et améliorer le service (accès aux ressources, recherche, filtres).</li>
              <li>Répondre à vos demandes via les formulaires de contact.</li>
              <li>Modérer et publier les contributions déposées par les étudiants.</li>
              <li>Mesurer l'audience et comprendre l'usage du site (statistiques anonymisées).</li>
              <li>Assurer la sécurité et prévenir les abus (spam, contenus inappropriés).</li>
            </ul>

            <h2 id="base-legale" className="scroll-mt-24">
              3. Base légale
            </h2>
            <p>
              Le traitement de vos données repose selon les cas sur : votre
              consentement (ex. cookies non essentiels), l'exécution d'un
              service que vous avez demandé (ex. formulaire de contact,
              contribution de ressource), ou notre intérêt légitime à assurer
              le bon fonctionnement et la sécurité de la plateforme.
            </p>

            <h2 id="cookies" className="scroll-mt-24">
              4. Cookies et traceurs
            </h2>
            <p>
              MYISTA peut utiliser des cookies ou technologies similaires pour
              [préciser : mesure d'audience via [nom de l'outil, ex. Google
              Analytics / Plausible], préférences d'affichage, maintien de
              session]. Vous pouvez configurer votre navigateur pour refuser
              les cookies non essentiels ; certaines fonctionnalités du site
              pourraient alors être limitées.
            </p>

            <h2 id="partage" className="scroll-mt-24">
              5. Partage des données
            </h2>
            <p>
              Nous ne vendons pas vos données personnelles. Elles peuvent être
              partagées uniquement avec :
            </p>
            <ul>
              <li>Nos prestataires techniques (hébergeur : [Vercel], outils de mesure d'audience).</li>
              <li>Les autorités compétentes si la loi l'exige.</li>
            </ul>

            <h2 id="conservation" className="scroll-mt-24">
              6. Durée de conservation
            </h2>
            <p>
              Vos données sont conservées le temps nécessaire aux finalités
              décrites ci-dessus, et au maximum [durée, ex. 3 ans après votre
              dernière interaction avec le site], sauf obligation légale de
              conservation plus longue.
            </p>

            <h2 id="droits" className="scroll-mt-24">
              7. Vos droits
            </h2>
            <p>Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et d'opposition concernant vos données personnelles. Pour exercer ces droits, contactez-nous à l'adresse indiquée en section 11.</p>

            <h2 id="securite" className="scroll-mt-24">
              8. Sécurité
            </h2>
            <p>
              Nous mettons en œuvre des mesures raisonnables (techniques et
              organisationnelles) pour protéger vos données contre l'accès non
              autorisé, la perte ou l'altération. Aucun système n'étant
              infaillible, nous ne pouvons garantir une sécurité absolue.
            </p>

            <h2 id="mineurs" className="scroll-mt-24">
              9. Mineurs
            </h2>
            <p>
              MYISTA s'adresse principalement à un public étudiant majeur. Si
              vous pensez qu'un mineur nous a communiqué des données sans
              autorisation parentale, contactez-nous afin que nous puissions
              les supprimer.
            </p>

            <h2 id="modifications" className="scroll-mt-24">
              10. Modifications
            </h2>
            <p>
              Cette politique peut être mise à jour pour refléter des
              changements légaux ou fonctionnels. La date de dernière mise à
              jour figure en haut de cette page.
            </p>

            <h2 id="contact" className="scroll-mt-24">
              11. Contact
            </h2>
            <p>
              Pour toute question relative à cette politique ou à vos données
              personnelles, contactez-nous à :{" "}
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