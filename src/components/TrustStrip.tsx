import React from "react";
import { ShieldCheck, Snowflake, Truck, Award, Star, Users, MapPin } from "lucide-react";

export default function TrustStrip() {
  const trustBadges = [
    { text: "ISI Certified Class-I", icon: <ShieldCheck className="w-4 h-4 text-brick-light" /> },
    { text: "Local Prayagraj Bhattha", icon: <MapPin className="w-4 h-4 text-brick-light" /> },
    { text: "Super Fast Truck Transit", icon: <Truck className="w-4 h-4 text-brick-light text-brick-primary" /> },
    { text: "Unbeatable Bulk Discounts", icon: <Award className="w-4 h-4 text-brick-light" /> },
    { text: "800+ Happy Construction Builders", icon: <Users className="w-4 h-4 text-brick-light" /> },
    { text: "Ganga-Yamuna Silt Clay", icon: <Snowflake className="w-4 h-4 text-brick-light" /> },
    { text: "GST Invoice Compliant", icon: <Star className="w-4 h-4 fill-brick-light text-brick-light" /> },
  ];

  // Repeat items to keep the marquee continuous and gapless
  const doubleBadges = [...trustBadges, ...trustBadges, ...trustBadges];

  return (
    <div 
      className="bg-stone-900 border-y border-stone-850 py-4 overflow-hidden relative w-full select-none"
      id="trust-badges-strip"
    >
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-stone-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-stone-900 to-transparent z-10 pointer-events-none" />

      {/* Scrolling Container */}
      <div className="flex w-max items-center animate-infinite-marquee">
        <div className="flex shrink-0 items-center gap-12 text-sm text-stone-200">
          {doubleBadges.map((badge, idx) => (
            <div key={idx} className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-wider">
              {badge.icon}
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Inlined CSS for marquee keyframes */}
      <style>{`
        @keyframes infiniteMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }
        .animate-infinite-marquee {
          animation: infiniteMarquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
