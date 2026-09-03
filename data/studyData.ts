import type { Department, Module, Resource } from "@/types/study";

export const departments: Department[] = [
  {
    id: "marketing",
    slug: "marketing",
    name: "Marketing",
    description: "Comportement du consommateur, branding, marketing digital et étude de marché.",
    icon: "Target",
  },
  {
    id: "commerce",
    slug: "commerce",
    name: "Commerce",
    description: "Techniques de vente, gestion commerciale, approvisionnement et droit des affaires.",
    icon: "ShoppingBag",
  },
  {
    id: "comptabilite",
    slug: "comptabilite",
    name: "Comptabilité",
    description: "Comptabilité générale et des sociétés, fiscalité, et gestion financière.",
    icon: "Calculator",
  },
  {
    id: "ressources-humaines",
    slug: "ressources-humaines",
    name: "Ressources Humaines",
    description: "Gestion des ressources humaines, droit du travail et développement personnel.",
    icon: "Users",
  },
  {
    id: "gestion",
    slug: "gestion",
    name: "Gestion",
    description: "Management des entreprises, outils bureautiques, économie et compétences transversales.",
    icon: "Briefcase",
  },
];

export const modules: Module[] = [
  // --- Marketing ---
  { id: "marketing-general-digital", department_id: "marketing", title: "Marketing général et digital", description: "Fondamentaux du marketing : mix marketing, segmentation, positionnement.", semester: "Semestre 2" },
  { id: "marketing-digital", department_id: "marketing", title: "Marketing Digital", description: "Stratégies digitales, réseaux sociaux, SEO et publicité en ligne.", semester: "Semestre 3" },
  { id: "marketing-international", department_id: "marketing", title: "Marketing International", description: "Stratégies marketing à l'export et adaptation aux marchés étrangers.", semester: "Semestre 3" },
  { id: "ecommerce", department_id: "marketing", title: "E-commerce", description: "Création et gestion d'une boutique en ligne, paiement, logistique.", semester: "Semestre 4" },

  // --- Commerce ---
  { id: "gestion-commerciale-approvisionnement", department_id: "commerce", title: "Gestion commerciale et approvisionnement", description: "Gestion des stocks, achats, et relation fournisseurs.", semester: "Semestre 2" },
  { id: "droit-general-affaires", department_id: "commerce", title: "Droit général et droit des affaires", description: "Notions juridiques de base et droit commercial appliqué à l'entreprise.", semester: "Semestre 1" },
  { id: "creation-entreprise-business-plan", department_id: "commerce", title: "Création d'entreprise et Business Plan", description: "Étapes de création d'une entreprise et construction d'un business plan.", semester: "Semestre 4" },

  // --- Comptabilité ---
  { id: "comptabilite-generale-bases", department_id: "comptabilite", title: "Comptabilité générale - Les bases", description: "Principes fondamentaux de la comptabilité générale.", semester: "Semestre 1" },
  { id: "comptabilite-generale-operations", department_id: "comptabilite", title: "Comptabilité générale - Opérations courantes", description: "Enregistrement des opérations courantes de l'entreprise.", semester: "Semestre 2" },
  { id: "comptabilite-societes", department_id: "comptabilite", title: "Comptabilité des sociétés", description: "Traitement comptable des opérations spécifiques aux sociétés.", semester: "Semestre 3" },
  { id: "comptabilite-analytique-gestion", department_id: "comptabilite", title: "Comptabilité analytique de gestion", description: "Calcul et analyse des coûts pour la prise de décision.", semester: "Semestre 3" },
  { id: "mathematiques-financieres", department_id: "comptabilite", title: "Mathématiques financières", description: "Intérêts simples et composés, annuités, et calculs financiers appliqués.", semester: "Semestre 2" },
  { id: "gestion-financiere-diagnostic", department_id: "comptabilite", title: "Gestion financière et diagnostic financier", description: "Analyse des états financiers et diagnostic de la santé financière.", semester: "Semestre 4" },
  { id: "fiscalite-entreprise", department_id: "comptabilite", title: "Fiscalité de l'entreprise", description: "Impôts et taxes applicables à l'entreprise : IS, TVA, IR.", semester: "Semestre 4" },

  // --- Ressources Humaines ---
  { id: "grh", department_id: "ressources-humaines", title: "Gestion des ressources humaines (GRH)", description: "Recrutement, gestion des carrières, et administration du personnel.", semester: "Semestre 3" },
  { id: "droit-travail-securite-sociale", department_id: "ressources-humaines", title: "Droit du travail et sécurité sociale", description: "Cadre légal du travail et régime de sécurité sociale au Maroc.", semester: "Semestre 3" },
  { id: "soft-skills-culture-digitale", department_id: "ressources-humaines", title: "Soft Skills & Culture digitale", description: "Compétences comportementales et culture numérique en entreprise.", semester: "Semestre 3" },
  { id: "communication-francais", department_id: "ressources-humaines", title: "Communication en français", description: "Techniques de communication écrite et orale en français professionnel.", semester: "Semestre 1" },
  { id: "communication-anglais", department_id: "ressources-humaines", title: "Communication en anglais", description: "Communication professionnelle en anglais.", semester: "Semestre 2" },

  // --- Gestion ---
  { id: "metier-formation", department_id: "gestion", title: "Métier et formation", description: "Découverte du métier visé et du parcours de formation.", semester: "Semestre 1" },
  { id: "bureautique-outils-digitaux", department_id: "gestion", title: "Bureautique et outils digitaux", description: "Word, Excel, PowerPoint, et outils numériques du quotidien professionnel.", semester: "Semestre 1" },
  { id: "management-entreprises", department_id: "gestion", title: "Management des entreprises", description: "Fonctions de management : planifier, organiser, diriger, contrôler.", semester: "Semestre 2" },
  { id: "statistique-appliquee", department_id: "gestion", title: "Statistique appliquée", description: "Outils statistiques appliqués à la gestion et à l'analyse de données.", semester: "Semestre 1" },
  { id: "economie-generale-entreprises", department_id: "gestion", title: "Économie générale et des entreprises", description: "Notions d'économie générale et fonctionnement économique de l'entreprise.", semester: "Semestre 1" },
  { id: "gestion-budgetaire-tableau-bord", department_id: "gestion", title: "Gestion budgétaire et tableau de bord", description: "Élaboration de budgets et pilotage de la performance via indicateurs.", semester: "Semestre 4" },
  { id: "pgi", department_id: "gestion", title: "Logiciels de gestion intégrés (PGI)", description: "Prise en main d'un progiciel de gestion intégré (type ERP).", semester: "Semestre 3" },
  { id: "english-for-business", department_id: "gestion", title: "English for Business", description: "Business English for professional contexts.", semester: "Semestre 4" },
  { id: "stage-entreprise", department_id: "gestion", title: "Stage en entreprise", description: "Stage pratique en milieu professionnel et rapport de stage.", semester: "Semestre 4" },
];

export const resources: Resource[] = [
  {
    id: "marketing-mix-pdf",
    module_id: "marketing-general-digital",
    title: "Introduction au Marketing Digital",
    description: "Cours complet sur les fondamentaux du marketing digital et stratégies SEO.",
    type: "pdf",
    file_url: "https://drive.google.com/file/d/18TUSdZwiTOYU94Yf3QuwoBKw-9mISyZN/view?usp=drive_link",
    external_url: null,
    thumbnail_url: null,
    author: "Prof. Amrani",
    downloads_count: 0,
    views_count: 0,
    created_at: "2026-01-15T00:00:00.000Z",
  },
  {
    id: "segmentation-slides",
    module_id: "marketing-general-digital",
    title: "Segmentation du marché — Diaporama",
    description: "Support utilisé en cours sur les critères de segmentation.",
    type: "slides",
    file_url: "PASTE_GOOGLE_DRIVE_LINK_HERE",
    external_url: null,
    thumbnail_url: null,
    author: "Prof. Amrani",
    downloads_count: 0,
    views_count: 0,
    created_at: "2026-01-20T00:00:00.000Z",
  },
  {
    id: "seo-basics-video",
    module_id: "marketing-digital",
    title: "Les bases du SEO — Cours enregistré",
    description: "Session enregistrée sur le référencement naturel (on-page et off-page).",
    type: "examens",
    file_url: null,
    external_url: "PASTE_GOOGLE_DRIVE_LINK_HERE",
    thumbnail_url: null,
    author: "Prof. Idrissi",
    downloads_count: 0,
    views_count: 0,
    created_at: "2026-02-01T00:00:00.000Z",
  },
  {
    id: "capital-budgeting-pdf",
    module_id: "gestion-financiere-diagnostic",
    title: "Méthodes de choix des investissements",
    description: "VAN, TRI et délai de récupération — exemples corrigés inclus.",
    type: "pdf",
    file_url: "PASTE_GOOGLE_DRIVE_LINK_HERE",
    external_url: null,
    thumbnail_url: null,
    author: "Prof. Bennani",
    downloads_count: 0,
    views_count: 0,
    created_at: "2026-01-18T00:00:00.000Z",
  },
];