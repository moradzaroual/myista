import { Mail, Facebook, Linkedin, Instagram, type LucideIcon } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// حيدت Twitter حيت ماطلبتيهش فالتصميم الجديد، وخليت غير لي طلبتي
const CONTACTS: { icon: LucideIcon; label: string; href: string }[] = [
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/profile.php?id=100064145287128" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/myista" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/myista" },
  { icon: Mail, label: "Email", href: "mailto:myista@zohomail.com" },
];

export default function AboutPage() {
  return (
    // استعملنا لون الخلفية لي طلبتي #FDFBF7
    <div className="bg-[#FDFBF7] min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-16 px-6 sm:px-12 lg:px-24">
        <section className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* العمود الأيسر: النصوص والأزرار */}
          <div className="flex flex-col items-start text-left fade-in-up">
            <span className="text-sm font-semibold text-gray-600 mb-3 tracking-wide">
              À propos de nous
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.15] mb-6">
  Toutes vos ressources,
  <span className="block italic font-normal text-[#0D9488] mt-2">réunies.</span>
</h1>
            
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 max-w-lg">
              MYISTA rassemble les PDFs, vidéos, slides et articles de tous les modules en un seul endroit, organisés par département. Construite par des étudiants, pour des étudiants — chaque contribution profite à la promotion suivante.
            </p>

            <button className="bg-[#0D9488] hover:bg-[#0a7a6a] text-white font-bold uppercase tracking-wide px-8 py-3.5 rounded-xl transition-colors mb-8 shadow-sm">
              CONTACTEZ-NOUS
            </button>

            {/* أيقونات التواصل الاجتماعي */}
            <div className="flex items-center gap-4">
              {CONTACTS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0D9488] text-white transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] focus:ring-offset-2 focus:ring-offset-[#FDFBF7]"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* العمود الأيمن: شبكة الصور والأشكال 2x2 */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-[500px] mx-auto lg:mx-0 aspect-square fade-in-up" style={{ animationDelay: "0.2s" }}>
            
            {/* الفوق على اليسار: دائرة صفراء */}
            <div className="bg-[#FFDD1F] w-full h-full rounded-full"></div>

            {/* الفوق على اليمين: صورة الطالب */}
            <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1571193161738-deaba9b6cc26?q=80&w=445&auto=format&fit=crop"
                alt="Étudiant"
                className="w-full h-full object-cover"
              />
            </div>

            {/* التحت على اليسار: صورة الأستوديو */}
            <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
              <img
                src="https://plus.unsplash.com/premium_photo-1664372145541-4556b409492e?q=80&w=869&auto=format&fit=crop"
                alt="Studio d'enregistrement"
                className="w-full h-full object-cover"
              />
            </div>

            {/* التحت على اليمين: دائرة خضراء وسطها دائرة صفراء */}
            <div className="bg-[#0D9488] w-full h-full rounded-full flex items-center justify-center relative">
              <div className="bg-[#FFDD1F] w-[35%] h-[35%] rounded-full"></div>
            </div>
            
          </div>
        </section>
      </main>

      {/* أنيميشن خفيفة للدخول */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .fade-in-up { animation: none; }
        }
      `}</style>

      
    </div>
  );
}