import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, MessageSquare, Quote } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TESTIMONIALS } from "../lib/constants";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      handleNext();
    }, 4500);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
    resetTimer();
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    resetTimer();
  };

  const handleDotClick = (index: number) => {
    setCurrent(index);
    resetTimer();
  };

  const activeTestimonial = TESTIMONIALS[current];

  return (
    <section id="testimonials" className="py-24 bg-stone-100 overflow-hidden relative border-y border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-brick-light text-xs font-semibold tracking-widest uppercase mb-2">Customer Feedback</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900 leading-tight">
            Trusted by Elite Builders
          </h2>
          <div className="w-16 h-1 bg-brick-primary mt-4 rounded-full"></div>
        </div>

        {/* Carousel Enclosure */}
        <div className="relative bg-white rounded-2xl border border-stone-200 shadow-xl p-8 sm:p-12 md:p-16">
          {/* Gigantic decorative quote backdrop */}
          <div className="absolute top-6 left-6 text-stone-100 select-none pointer-events-none -z-1">
            <Quote className="w-24 h-24 rotate-180" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex flex-col items-center text-center relative"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-400 mb-6" id="rating-stars">
                {[...Array(activeTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>

              {/* Quote text block */}
              <blockquote className="text-stone-700 text-base sm:text-lg md:text-xl font-medium leading-relaxed mb-8 italic">
                "{activeTestimonial.quote}"
              </blockquote>

              {/* Customer description */}
              <div className="flex flex-col items-center">
                <cite className="not-italic font-display font-bold text-stone-900 text-base sm:text-lg">
                  {activeTestimonial.name}
                </cite>
                <span className="text-stone-500 text-xs sm:text-sm mt-1">
                  {activeTestimonial.company} · <strong className="text-brick-primary">{activeTestimonial.city}</strong>
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left Arrow Trigger */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full border border-stone-200 hover:border-brick-primary bg-white text-stone-500 hover:text-brick-primary hover:shadow-md transition-all focus:outline-none"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Trigger */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full border border-stone-200 hover:border-brick-primary bg-white text-stone-500 hover:text-brick-primary hover:shadow-md transition-all focus:outline-none"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots Navigator */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                index === current ? "w-8 bg-brick-primary" : "w-2 bg-stone-300 hover:bg-stone-400"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
