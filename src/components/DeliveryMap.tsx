import React from "react";
import { Truck, MapPin, CheckCircle, ArrowRight, ShieldAlert, Navigation } from "lucide-react";
import { DELIVERY_CITIES, COMPANY_INFO } from "../lib/constants";

export default function DeliveryMap() {
  const handleContactRedirect = () => {
    const element = document.getElementById("contact");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="delivery" className="py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Information Column (Left) */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-brick-primary text-xs font-semibold tracking-widest uppercase mb-2 block">Logistical Footprint</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900 leading-tight">
              We Deliver High Volume Batches Across Uttar Pradesh
            </h2>
            <div className="w-16 h-1 bg-brick-primary rounded-full"></div>
            
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Operating our own robust truck fleet, we support heavy loader transits directly from our bhatta yard at Garapur, Jhusi. We maintain regular scheduled shipping alignments across key state corridors.
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-100">
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-150">
                <span className="text-3xl sm:text-4.5xl font-mono font-extrabold text-brick-dark block">10+</span>
                <span className="text-stone-500 font-mono text-[10px] uppercase font-bold tracking-wider mt-1 block">Districts Served</span>
              </div>
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-150">
                <span className="text-3xl sm:text-4.5xl font-mono font-extrabold text-brick-dark block">24 Hr</span>
                <span className="text-stone-500 font-mono text-[10px] uppercase font-bold tracking-wider mt-1 block">Quick Dispatch</span>
              </div>
            </div>

            {/* Micro Call to Action */}
            <div className="pt-2">
              <button
                onClick={handleContactRedirect}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brick-primary hover:text-brick-light transition-colors group"
                id="coverage-contact-link"
              >
                Check if we deliver to your specific site area
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* District Grid Column (Right) */}
          <div className="lg:col-span-6 bg-stone-50 border border-stone-200 p-6 sm:p-8 rounded-2xl relative shadow-sm">
            <div className="absolute -top-3.5 -right-3.5 bg-brick-primary text-white p-2.5 rounded-xl shadow-lg border border-orange-400">
              <Truck className="w-5 h-5 text-white" />
            </div>

            <h3 className="text-lg font-display font-bold text-stone-900 mb-6 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-brick-primary animate-pulse" />
              Active Delivery Hubs (Purvanchal & State Roads)
            </h3>

            {/* Badge Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3" id="district-badges-grid">
              {DELIVERY_CITIES.map((city) => (
                <div 
                  key={city}
                  className="bg-white hover:bg-stone-100/50 border border-stone-200 hover:border-brick-light/40 py-3.5 px-4 rounded-xl flex items-center gap-3 transition-colors duration-200 shadow-sm group cursor-default"
                >
                  <MapPin className="w-4 h-4 text-stone-400 group-hover:text-brick-primary shrink-0 transition-colors" />
                  <span className="text-sm font-semibold text-stone-800 tracking-wide">{city}</span>
                </div>
              ))}
            </div>

            {/* Info footer */}
            <div className="mt-6 pt-4 border-t border-stone-200/80 text-[11px] text-stone-500 leading-relaxed flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p>
                <strong>Unloading Assistance Included:</strong> Our transport packages include experienced drivers skilled in standard ground stacking at active construction zones.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
