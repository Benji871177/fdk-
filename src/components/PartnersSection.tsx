import React, { useState } from 'react';
import { Language } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Handshake, 
  Sparkles, 
  ArrowUpRight, 
  Mail, 
  Globe, 
  Heart,
  Shield, 
  CheckCircle2,
  X,
  Eye,
  Search
} from 'lucide-react';

interface PartnersSectionProps {
  language: Language;
}

export function PartnersSection({ language }: PartnersSectionProps) {
  const isFR = language === 'FR';
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const partners = [
    {
      id: 'im-visuals',
      name: 'IM',
      logo: 'https://i.postimg.cc/zv1cryDq/Whats-App-Image-2026-05-29-at-19-54-17.jpg',
      category: isFR ? "Visuels, Publicité & Affichage" : "Visuals, Advertising & Billboards",
      badgeColor: "bg-blue-50 text-blue-800 border-blue-200/50",
      description: isFR 
        ? "IM est notre partenaire stratégique spécialisé dans la conception visuelle de pointe, la publicité d'impact et les campagnes sur panneaux d'affichage d'envergure à Kananga. Grâce à son expertise créative et son réseau logistique, IM amplifie les campagnes de sensibilisation à la santé publique et aux droits civiques menées par la Fondation Dr François Katekesha, assurant une visibilité optimale de nos actions solidaires."
        : "IM is our strategic communication and media partner specializing in state-of-the-art visual design, corporate advertising campaigns, and high-impact roadside billboard solutions in Kananga. Leveraging their creative talent and physical assets, IM strengthens the Dr François Katekesha Foundation's regional outreach, making vital public health and education announcements highly visible to all local communities.",
      pillars: isFR 
        ? ["Conception graphique & identité visuelle", "Installation de panneaux d'affichage géants", "Campagnes de sensibilisation communautaire"]
        : ["Graphic design & corporate visual identity", "Large-scale roadside billboards", "Civic & healthcare awareness campaigns"],
      link: "#"
    },
    {
      id: 'prima-group',
      name: 'Prima Group',
      logo: 'https://i.postimg.cc/hjV2pK8f/Whats-App-Image-2026-06-01-at-11-32-15.jpg',
      category: isFR ? "BTP, Logistique & Exploitation" : "Construction, Supply Chain & Mining",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200/50",
      description: isFR 
        ? "Prima Group est un groupe industriel leader spécialisé dans la construction d'infrastructures de génie civil, la chaîne d'approvisionnement logistique et l'exploitation minière responsable. Ce partenariat solide permet à la FDFK de moderniser les structures éducatives, de sécuriser l'approvisionnement matériel pour nos projets d'autonomisation et de poser les jalons d'un développement économique local durable."
        : "Prima Group is a leading multi-sector industrial conglomerate specializing in advanced civil construction, robust global supply chain logistics, and community-conscious mining solutions. This powerful alliance secures critical engineering support for FDFK's school building projects, optimizes humanitarian logistics, and establishes sustainable pathways for regional economic revitalization.",
      pillars: isFR 
        ? ["Génie civil & construction d'écoles", "Chaîne logistique & fret humanitaire", "Initiatives de développement local RSE"]
        : ["Civil engineering & school construction", "Supply chain & humanitarian distribution", "CSR-driven community development programs"],
      link: "#"
    },
    {
      id: 'akili-tech',
      name: 'Akili',
      logo: 'https://i.postimg.cc/ncH83vZz/Akili-logo-Transp-(1).png',
      category: isFR ? "Technologies, Éducation & Innovation" : "Tech, Digital Literacy & Innovation",
      badgeColor: "bg-indigo-50 text-indigo-800 border-indigo-200/50",
      description: isFR 
        ? "Akili est un partenaire d'innovation technologique de premier plan dédié à l'accélération numérique et à l'éducation inclusive à Kananga. Grâce à ce partenariat de confiance avec la FDFK, Akili soutient l'équipement et l'animation de laboratoires de formation aux compétences informatiques pour la jeunesse locale. Ensemble, nous soutenons l'émergence de talents technologiques essentiels pour l'avenir de la province du Kasaï-Central."
        : "Akili is a leading technology and innovation partner committed to digital acceleration and inclusive computer literacy in Kananga. Through this trusted alliance with FDFK, Akili operates high-standard digital training and software workshop labs for local youth. Together, we are building local technical capabilities and job-readiness essential for Kasaï-Central's economic future.",
      pillars: isFR 
        ? ["Laboratoires informatiques d'apprentissage", "Formations professionnelles en bureautique et technologies", "Rapprocher la jeunesse de l'inclusion numérique"]
        : ["Computer training and hardware workspace labs", "Vocational digital & software skills coaching", "Bridging the local digital divide for youth"],
      link: "#"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="space-y-12 sm:space-y-16"
    >
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-gold/15 rounded-full border border-brand-gold/25 shadow-2xs">
          <Handshake className="h-4 w-4 text-[#D29A22] animate-pulse" />
          <span className="font-mono text-[10px] text-brand-gold font-extrabold uppercase tracking-widest leading-none">
            {isFR ? "ALLIANCES STRATÉGIQUES" : "STRATEGIC ALLIANCES"}
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-brand-navy tracking-tight leading-none font-sans">
          {isFR ? "Nos Partenariats de Confiance" : "Our Trusted Partnerships"}
        </h1>
        <p className="font-sans text-xs sm:text-base text-slate-555 leading-relaxed font-semibold">
          {isFR
            ? "Pour maximiser notre impact à Kananga et à travers la province du Kasaï-Central, nous collaborons étroitement avec des organisations internationales et locales de premier plan."
            : "To maximize our impact in Kananga and across the Kasaï-Central province, we collaborate closely with major international and local organizations."}
        </p>
      </div>

      {/* CSS For Seamless Infinite Horizontal Scrolling Marquee */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes partners-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .partners-marquee-track {
          display: flex;
          width: max-content;
          animation: partners-marquee 25s linear infinite;
        }
        .partners-marquee-track:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Infinite Scrolling Ticker Container */}
      <div className="relative w-full overflow-hidden py-10 bg-slate-50/80 border border-slate-200/60 rounded-[32px] shadow-xs">
        {/* Soft Left and Right Gradient Fades to mask entrance/exit */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50/90 to-transparent z-10 pointer-events-none" />

        <div className="partners-marquee-track gap-6 sm:gap-8 flex items-center pr-6 sm:pr-8">
          {/* Loop twice so that moving -50% creates a seamless looping transition across all partners */}
          {[...partners, ...partners].map((partner, index) => (
            <div 
              key={`${partner.id}-${index}`}
              onClick={() => setZoomedImage(partner.logo)}
              className="group relative bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 flex items-center gap-5 sm:gap-6 shadow-xs hover:shadow-md transition-all duration-300 hover:border-brand-gold/30 cursor-zoom-in shrink-0 w-[280px] sm:w-[360px] overflow-hidden select-none"
            >
              {/* Decorative accent design */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-brand-gold/5 rounded-bl-full pointer-events-none" />
              
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-white border border-slate-150 p-1.5 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`} 
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain rounded select-none"
                />
              </div>

              <div className="flex-1 min-w-0 text-left space-y-1.5">
                <span className={`inline-flex items-center text-[8px] sm:text-[9px] font-extrabold tracking-wider px-2.5 py-0.5 rounded uppercase border ${partner.badgeColor} leading-none`}>
                  {partner.category}
                </span>
                <h3 className="font-display font-black text-brand-navy text-sm sm:text-base tracking-tight leading-none truncate">
                  {partner.name}
                </h3>
                <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest leading-none">
                  <Sparkles className="h-2.5 w-2.5 text-brand-gold animate-pulse shrink-0" />
                  <span>{isFR ? "Agrandir" : "Zoom Logo"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Synergy Block / Partner Call To Action */}
      <div className="bg-brand-navy rounded-[32px] border border-brand-gold/30 p-6 sm:p-10 text-white relative overflow-hidden shadow-xl max-w-5xl mx-auto">
        {/* Abstract background blobs for design polish */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-flex items-center gap-1 text-[9px] font-extrabold tracking-widest bg-brand-gold/20 text-brand-gold px-2.5 py-1 rounded-md uppercase border border-brand-gold/20">
              {isFR ? "ÉLARGIR NOS HORIZONS" : "EXPANDING OUR HORIZONS"}
            </span>
            <h3 className="font-display font-black text-white text-xl sm:text-2xl md:text-3xl tracking-tight leading-tight">
              {isFR 
                ? "Vous souhaitez devenir un partenaire de la FDFK ?" 
                : "Interested in partnering with the FDFK?"}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              {isFR
                ? "La FDFK accueille chaleureusement les collaborations avec les fondations internationales, les agences d'aide humanitaire, les institutions privées et publiques. Ensemble, construisons des programmes pérennes pour offrir un avenir radieux et juste aux ménages du Kasaï-Central."
                : "FDFK warmly welcomes structured support and joint operations with world-class medical coalitions, impact funds, NGOs, corporate sponsors, and local leaders. Let us secure a progressive, safe, and empowered future for families in Kasaï-Central."}
            </p>
          </div>
          
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <a 
              href="mailto:bkatekesha8@gmail.com?subject=Partenariat%20FDFK"
              className="bg-brand-gold hover:bg-[#D29A22] text-brand-navy font-black text-xs uppercase tracking-widest py-3 px-5 rounded-2xl flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all cursor-pointer shadow-md text-center"
            >
              <Mail className="h-4 w-4 shrink-0 fill-current" />
              <span>{isFR ? "Contacter notre équipe" : "Contact Our Team"}</span>
            </a>
            <button
              onClick={() => {
                const el = document.getElementById('fdfk-portal-root');
                if (el) {
                  // Navigate to volunteer panel
                  const volunteerBtn = document.getElementById('nav-volunteer');
                  if (volunteerBtn) volunteerBtn.click();
                }
              }}
              className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-black text-xs uppercase tracking-widest py-3 px-5 rounded-2xl flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all cursor-pointer text-center"
            >
              <Heart className="h-4 w-4 text-brand-gold shrink-0 fill-current" />
              <span>{isFR ? "Devenir Volontaire" : "Become Volunteer"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal overlay for Partners certificates/logos display */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
            className="fixed inset-0 bg-slate-950/90 z-50 flex items-center justify-center p-4 sm:p-10 backdrop-blur-sm cursor-zoom-out select-none"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image frame
              className="relative max-w-4xl max-h-[85vh] bg-white rounded-3xl p-2.5 sm:p-4 shadow-2xl flex flex-col items-center justify-center border border-slate-750"
            >
              {/* Close Button overlay */}
              <button
                onClick={() => setZoomedImage(null)}
                className="absolute -top-12 sm:top-4 -right-2 sm:right-4 h-10 w-10 rounded-full bg-black/60 text-white border border-white/20 flex items-center justify-center hover:bg-black/80 transition-all cursor-pointer z-50 scale-100"
                title={isFR ? "Fermer" : "Close"}
              >
                <X className="h-5 w-5" />
              </button>

              <div className="w-full h-full flex items-center justify-center overflow-auto rounded-2xl bg-white p-1 max-h-[75vh]">
                <img 
                  src={zoomedImage} 
                  alt={isFR ? "Aperçu de partenariat détaillé" : "Detailed Partnership View"} 
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[70vh] object-contain rounded-xl select-none"
                />
              </div>

              {/* Sub-label footer explaining zoom */}
              <div className="pt-3 pb-1 text-center font-sans text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                {isFR ? "Document Officiel / Logo Partenaire • Cliquez n'importe où pour fermer" : "Official Document / Partner Logo • Click anywhere to close"}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
