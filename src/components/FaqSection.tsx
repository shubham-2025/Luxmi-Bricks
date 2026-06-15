import React, { useState } from "react";
import { Plus, Minus, HelpCircle, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FAQS } from "../lib/constants";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-24 bg-stone-900 text-white relative border-t border-stone-950">
      <div className="absolute inset-0 bg-stone-950/10 pointer-events-none" />
      <div className="absolute top-[30%] right-[5%] w-[30%] h-[30%] rounded-full bg-brick-primary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-brick-light text-xs font-semibold tracking-widest uppercase mb-2">Self-Service Center</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight">
            Frequently Answered Inquiries
          </h2>
          <div className="w-16 h-1 bg-brick-primary mt-4 mb-4 rounded-full"></div>
          <p className="text-stone-400 text-sm sm:text-base max-w-xl">
            Read direct diagnostic answers regarding our manufacturing standard parameters, delivery truck policies, and secure commercial payments.
          </p>
        </div>

        {/* Dynamic Accordion items */}
        <div className="space-y-4" id="faqs-accordion-wrapper">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`bg-stone-850 border rounded-xl overflow-hidden transition-all duration-200 ${
                  isOpen 
                    ? "border-brick-primary/40 shadow-lg shadow-orange-950/10 bg-stone-850" 
                    : "border-stone-800 hover:border-stone-750"
                }`}
              >
                {/* Accordion Trigger */}
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between text-left py-4.5 px-6 gap-4 text-stone-100 hover:text-white font-medium text-sm sm:text-base"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className={`w-4 h-4 shrink-0 transition-colors ${isOpen ? "text-brick-light" : "text-stone-500"}`} />
                    <span>{faq.question}</span>
                  </span>
                  
                  {/* Styled Switch Circle */}
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center border shrink-0 transition-all ${
                    isOpen 
                      ? "bg-brick-primary/20 border-brick-primary/40 text-brick-light" 
                      : "bg-stone-900 border-stone-800 text-stone-500"
                  }`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </button>

                {/* Animated content expansion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 pt-1 text-stone-400 text-xs sm:text-sm leading-relaxed border-t border-stone-800/60 font-sans">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Micro footer check */}
        <div className="mt-12 text-center p-5 bg-stone-850/30 border border-stone-800 rounded-xl max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-stone-400 text-xs sm:text-sm">
          <MessageSquare className="w-4 h-4 text-brick-light shrink-0" />
          <span>Have an unlisted query or high custom dimension specs?</span>
          <a 
            href="#contact"
            className="text-brick-light font-bold uppercase tracking-wider hover:underline"
          >
            Ask Us Directly &rarr;
          </a>
        </div>

      </div>
    </section>
  );
}
