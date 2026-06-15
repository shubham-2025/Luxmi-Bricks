import React, { useState, useEffect } from "react";
import { Maximize2, X, ChevronLeft, ChevronRight, SlidersHorizontal, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GALLERY_ITEMS, GalleryItem, COMPANY_INFO } from "../lib/constants";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<"all" | "factory" | "products" | "projects" | "delivery">("all");
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  // Filter items based on active category
  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  // Limit display to the visible count
  const displayedItems = filteredItems.slice(0, visibleCount);

  // Reset pagination limit on filter change
  useEffect(() => {
    setVisibleCount(6);
  }, [activeCategory]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIdx === null) return;
      if (e.key === "Escape") setActiveIdx(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIdx, filteredItems]);

  const handlePrev = () => {
    setActiveIdx((prev) => 
      prev === null ? null : prev === 0 ? filteredItems.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIdx((prev) => 
      prev === null ? null : prev === filteredItems.length - 1 ? 0 : prev + 1
    );
  };

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const filterTabs = [
    { label: "All Works", value: "all" },
    { label: "Factory & Kiln", value: "factory" },
    { label: "Brick Products", value: "products" },
    { label: "Client Projects", value: "projects" },
    { label: "Delivery Fleet", value: "delivery" }
  ] as const;

  return (
    <section id="gallery" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-12 max-w-2xl mx-auto">
          <span className="text-brick-light text-xs font-semibold tracking-widest uppercase mb-2">Visual Showcase</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900 leading-tight">
            Our Works & Manufacturing Excellence
          </h2>
          <div className="w-16 h-1 bg-brick-primary mt-4 mb-4 rounded-full"></div>
          <p className="text-stone-600 text-sm sm:text-base">
            Take a visual tour around our high-volume automated factory lines in Prayagraj, premium stockpiles, and active delivery transit blocks.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" id="gallery-filter-tabs">
          {filterTabs.map((tab) => {
            const isActive = activeCategory === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveCategory(tab.value)}
                className={`px-4.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-stone-900 text-white shadow-md border border-stone-900"
                    : "bg-white text-stone-600 border border-stone-200 hover:border-stone-400"
                }`}
              >
                {tab.value !== "all" && isActive && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-brick-primary mr-2 animate-ping" />
                )}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Animated layout grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          id="gallery-items-grid"
        >
          <AnimatePresence mode="popLayout">
            {displayedItems.map((item: GalleryItem, index: number) => {
              const isImageLoaded = loadedImages[item.id];
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  key={item.id}
                  onClick={() => {
                    const globalIdx = filteredItems.findIndex((fi) => fi.id === item.id);
                    if (globalIdx !== -1) setActiveIdx(globalIdx);
                  }}
                  className="relative overflow-hidden rounded-xl border border-stone-200 group bg-stone-100 aspect-4/3 cursor-pointer select-none group shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  
                  {/* Skeleton Loader placeholder */}
                  {!isImageLoaded && (
                    <div className="absolute inset-0 bg-stone-200 animate-pulse flex items-center justify-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full border-2 border-stone-300 border-t-brick-primary animate-spin" />
                        <span className="text-[10px] text-stone-400 font-mono font-bold tracking-wider uppercase">LOADING IMAGE...</span>
                      </div>
                    </div>
                  )}

                  {/* Core asset photo */}
                  <img
                    src={item.url}
                    alt={item.title}
                    onLoad={() => handleImageLoad(item.id)}
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 select-none pointer-events-none ${
                      isImageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* Labels and overlay hover state */}
                  <div className="absolute inset-0 bg-stone-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-1.5 rounded-full text-white">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                    
                    <span className="text-brick-light text-[10px] font-mono tracking-widest uppercase mb-1 block">
                      {item.category} • {item.hindiTitle ? COMPANY_INFO.hindiName : "Luxmi"}
                    </span>
                    <h4 className="text-white text-sm sm:text-base font-display font-bold leading-snug">
                      {item.title}
                    </h4>
                    {item.hindiTitle && (
                      <p className="text-stone-300 text-xs font-display font-medium mt-1">
                        {item.hindiTitle}
                      </p>
                    )}
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {filteredItems.length > visibleCount && (
          <div className="mt-12 text-center" id="gallery-load-more-container">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-white hover:bg-stone-100 border border-stone-300 hover:border-stone-400 text-stone-700 font-bold text-xs uppercase tracking-widest rounded-lg transition-transform hover:scale-[1.01]"
              id="gallery-load-more-btn"
            >
              Load More Gallery Assets
            </button>
          </div>
        )}

      </div>

      {/* Lightbox Modal (Bound to Filtered Items) */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8"
            role="dialog"
            aria-modal="true"
          >
            {/* Header / Top actions */}
            <div className="flex items-center justify-between text-white border-b border-stone-800/80 pb-4 max-w-7xl mx-auto w-full">
              <div className="flex flex-col">
                <span className="text-brick-light text-xs font-mono tracking-wider uppercase">
                  {filteredItems[activeIdx].category}
                </span>
                <h3 className="text-base md:text-xl font-display font-medium mt-0.5 max-w-[70vw] truncate">
                  {filteredItems[activeIdx].title}
                </h3>
              </div>
              
              <button
                onClick={() => setActiveIdx(null)}
                className="p-2 sm:p-2.5 rounded-full bg-stone-900 border border-stone-850 hover:bg-stone-800 text-stone-300 hover:text-white transition-all shadow-md focus:outline-none"
                aria-label="Close Lightbox"
                id="lightbox-close-btn"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Central Stage */}
            <div className="relative flex-grow flex items-center justify-center max-w-7xl mx-auto w-full my-6">
              
              {/* Prev Trigger */}
              <button
                onClick={handlePrev}
                className="absolute left-0 md:left-4 z-10 p-2 sm:p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-stone-800/60 text-stone-300 hover:text-white transition-all shadow-lg focus:outline-none"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Main Expanded Image */}
              <motion.img
                key={filteredItems[activeIdx].id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                src={filteredItems[activeIdx].url}
                alt={filteredItems[activeIdx].title}
                className="max-h-[60vh] md:max-h-[72vh] max-w-full rounded-lg object-contain shadow-2xl border border-stone-800 select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />

              {/* Next Trigger */}
              <button
                onClick={handleNext}
                className="absolute right-0 md:right-4 z-10 p-2 sm:p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-stone-800/60 text-stone-300 hover:text-white transition-all shadow-lg focus:outline-none"
                aria-label="Next Image"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Bottom Info */}
            <div className="text-center text-stone-500 text-[10px] sm:text-xs font-mono pb-2 max-w-7xl mx-auto w-full border-t border-stone-800/25 pt-4">
              Image {activeIdx + 1} of {filteredItems.length} • Use Keyboard Left/Right Arrows to Navigate
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
