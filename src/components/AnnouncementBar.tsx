import React, { useState, useEffect, useRef } from "react";
import { X, Sparkles, Phone } from "lucide-react";
import { COMPANY_INFO } from "../lib/constants";

export default function AnnouncementBar() {
  const [isOpen, setIsOpen] = useState(true);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDismissed = localStorage.getItem("luxmi_banner_dismissed");
    if (isDismissed === "true") {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.documentElement.style.setProperty("--announcement-bar-height", "0px");
      return;
    }

    const updateHeight = () => {
      if (elementRef.current) {
        const height = elementRef.current.offsetHeight;
        document.documentElement.style.setProperty("--announcement-bar-height", `${height}px`);
      }
    };

    // Measure initially
    updateHeight();

    // Use ResizeObserver for precise layout changes
    const observer = new ResizeObserver(updateHeight);
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [isOpen]);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem("luxmi_banner_dismissed", "true");
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={elementRef}
      className="bg-brick-dark text-white py-2 px-4 text-center text-xs md:text-sm font-medium relative flex items-center justify-center gap-2 z-[60] border-b border-white/10"
      id="seasonal-announcement-bar"
    >
      <div className="flex items-center justify-center gap-2 flex-wrap pr-8">
        <span className="inline-flex items-center gap-1 bg-white/15 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-cream">
          <Sparkles className="w-3 h-3 text-brick-light animate-pulse" /> Offer
        </span>
        <span className="tracking-wide">
          🧱 Summer Bulk Offer: Order <strong className="text-cream font-bold">10,000+ bricks</strong> & get <strong className="text-cream underline decoration-brick-light underline-offset-2">FREE delivery</strong> across Prayagraj!
        </span>
        <a 
          href={`tel:${COMPANY_INFO.phone}`} 
          className="inline-flex items-center gap-1 text-white bg-brick-primary hover:bg-brick-light px-2.5 py-1 rounded text-xs transition-colors duration-200 mt-1 sm:mt-0 font-semibold uppercase tracking-wider shadow-sm"
        >
          <Phone className="w-3 h-3" />
          Call Now
        </a>
      </div>
      
      <button 
        onClick={handleDismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition-colors duration-150"
        aria-label="Dismiss Offer Announcement"
        id="dismiss-announcement-btn"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
