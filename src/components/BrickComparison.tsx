import React from "react";
import { Check, Star, AlertCircle, Sparkles, Sliders } from "lucide-react";
import { motion } from "motion/react";
import { BRICK_COMPARISON } from "../lib/constants";

export default function BrickComparison() {
  return (
    <section id="comparison" className="py-24 bg-stone-50 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <span className="text-brick-light text-xs font-semibold tracking-widest uppercase mb-2">Technical Matrix</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900 leading-tight">
            Comprehensive Brick Family Comparison
          </h2>
          <div className="w-16 h-1 bg-brick-primary mt-4 mb-4 rounded-full"></div>
          <p className="text-stone-600 text-sm sm:text-base">
            Review detailed laboratory and practical traits across structural brick types to align with your building specs.
          </p>
        </div>

        {/* Comparison grid card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl border border-stone-200 shadow-xl overflow-hidden max-w-5xl mx-auto"
          id="brick-comparison-panel"
        >
          {/* Mobile swipe helper tag */}
          <div className="lg:hidden bg-stone-100 px-4 py-2 text-[10px] text-center font-mono font-semibold uppercase tracking-wider text-stone-500 border-b border-stone-200 flex items-center justify-center gap-1.5 animate-pulse">
            <Sliders className="w-3.5 h-3.5" /> Swipe horizontally to view full parameters
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              
              {/* Head */}
              <thead>
                <tr className="bg-stone-900 text-white font-mono text-xs uppercase tracking-widest border-b border-stone-800">
                  <th className="py-5 px-6 font-semibold w-1/4">Engineering Traits</th>
                  
                  {/* Traditional Red Clay Column Header */}
                  <th className="py-5 px-6 font-semibold w-1/4 relative">
                    Traditional Red Clay
                  </th>
                  
                  {/* Fly Ash Recommended Column Header */}
                  <th className="py-5 px-6 font-semibold w-1/4 bg-brick-dark/20 text-brick-light relative">
                    <div className="absolute top-2 right-4 bg-emerald-500 text-white font-sans text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                      <Sparkles className="w-2 h-2 fill-white" /> Eco Choice
                    </div>
                    Recycled Fly Ash Bricks
                  </th>
                  
                  {/* Exposed Face Column Header */}
                  <th className="py-5 px-6 font-semibold w-1/4">
                    Exposed Face Facing
                  </th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y divide-stone-150 text-sm text-stone-700">
                
                {/* Crushing Strength */}
                <tr className="hover:bg-stone-50/55 transition-colors">
                  <td className="py-4.5 px-6 font-semibold text-stone-900 font-mono text-xs">CRUSHING STRENGTH</td>
                  <td className="py-4.5 px-6">High (Class-I, 10-15 N/mm²)</td>
                  <td className="py-4.5 px-6 bg-orange-50/20 font-medium text-stone-900 border-x border-orange-100">
                    <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded text-xs">
                      <Check className="w-3.5 h-3.5" /> Very High (&gt; 15 N/mm²)
                    </span>
                  </td>
                  <td className="py-4.5 px-6">High Premium Block</td>
                </tr>

                {/* Water Absorption */}
                <tr className="hover:bg-stone-50/55 transition-colors">
                  <td className="py-4.5 px-6 font-semibold text-stone-900 font-mono text-xs">WATER ABSORPTION</td>
                  <td className="py-4.5 px-6 text-amber-700">Medium (12% - 15%)</td>
                  <td className="py-4.5 px-6 bg-orange-50/20 font-medium text-stone-900 border-x border-orange-100 text-emerald-700">
                    Low (&lt; 10%) - Best for Monsoons
                  </td>
                  <td className="py-4.5 px-6 text-emerald-700">Minimal (&lt; 8%)</td>
                </tr>

                {/* Eco Friendliness */}
                <tr className="hover:bg-stone-50/55 transition-colors">
                  <td className="py-4.5 px-6 font-semibold text-stone-900 font-mono text-xs">ECO FRIENDLINESS</td>
                  <td className="py-4.5 px-6 text-stone-500">Requires topsoil excavation</td>
                  <td className="py-4.5 px-6 bg-orange-50/20 font-semibold text-emerald-600 border-x border-orange-100">
                    Yes ✅ (Saves topsoil, utilizes ash)
                  </td>
                  <td className="py-4.5 px-6">Partial (Mineral terracotta blend)</td>
                </tr>

                {/* Plaster Required */}
                <tr className="hover:bg-stone-50/55 transition-colors">
                  <td className="py-4.5 px-6 font-semibold text-stone-900 font-mono text-xs">POST-PLASTER REQUIRED?</td>
                  <td className="py-4.5 px-6">Yes (Recommended for weathering)</td>
                  <td className="py-4.5 px-6 bg-orange-50/20 font-medium text-stone-900 border-x border-orange-100">
                    No (Saves mortar plaster up to 15%)
                  </td>
                  <td className="py-4.5 px-6 font-semibold text-brick-dark">
                    Never (Exposed face styled aesthetic)
                  </td>
                </tr>

                {/* Price Range */}
                <tr className="hover:bg-stone-50/55 transition-colors">
                  <td className="py-4.5 px-6 font-semibold text-stone-900 font-mono text-xs">ESTIMATED factory RATE</td>
                  <td className="py-4.5 px-6 font-mono font-semibold text-stone-950">₹6.00 – ₹8.00 / Brick</td>
                  <td className="py-4.5 px-6 bg-orange-50/20 font-mono font-bold text-brick-primary border-x border-orange-100">
                    ₹7.00 – ₹9.00 / Brick
                  </td>
                  <td className="py-4.5 px-6 font-mono font-semibold text-stone-950">₹12.00 – ₹18.00 / Brick</td>
                </tr>

                {/* Best For */}
                <tr className="hover:bg-stone-50/55 transition-colors">
                  <td className="py-4.5 px-6 font-semibold text-stone-900 font-mono text-xs">PRIMARY APPLICATION</td>
                  <td className="py-4.5 px-6 text-xs">Load-bearing foundations, boundary walls, single houses.</td>
                  <td className="py-4.5 px-6 bg-orange-50/20 font-semibold text-xs text-stone-800 border-x border-orange-100">
                    RCC high-rises, warehouses, structural grids requiring sizing uniformity.
                  </td>
                  <td className="py-4.5 px-6 text-xs">Aesthetic facade overlays, interior accent partitions, luxury villas.</td>
                </tr>

              </tbody>

            </table>
          </div>

          {/* Special highlights banner below table */}
          <div className="bg-stone-100 border-t border-stone-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <span className="text-xs text-stone-500 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-brick-primary shrink-0" />
              Volume freight discounts will lower these listed rate structures for order counts of 10k or more.
            </span>
            <a 
              href="#calculator" 
              className="text-xs font-bold uppercase tracking-wider text-brick-primary hover:text-brick-light flex items-center gap-1 hover:underline"
            >
              Test estimating with calculator &rarr;
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
