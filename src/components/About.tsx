import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { COMPANY_INFO, STATS_COUNTERS } from "../lib/constants";
import { Calendar, Target, Award, Shield, Landmark } from "lucide-react";

// Individual Counter Component
function StatCounter({ target, suffix, label, duration = 1500 }: { target: number; suffix: string; label: string; duration?: number; key?: any }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(elementRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    if (start === end) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <div ref={elementRef} className="bg-white p-4.5 rounded-xl border border-stone-150 shadow-sm flex flex-col items-center justify-center text-center">
      <span className="text-2.5xl sm:text-3.5xl font-mono font-extrabold text-brick-primary">
        {count}
        {suffix}
      </span>
      <span className="text-stone-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-1">{label}</span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 bg-stone-50 overflow-hidden border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="flex flex-col mb-16 max-w-3xl">
          <span className="text-brick-light text-xs font-semibold tracking-widest uppercase mb-2">Our Heritage</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900 leading-tight">
            Building Foundations of Trust in Purvanchal for Over Two Decades
          </h2>
          <div className="w-16 h-1 bg-brick-primary mt-4 rounded-full"></div>
        </div>

        {/* Two-Column Story Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text narrative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <p className="text-lg text-stone-700 leading-relaxed font-sans mb-6">
              Founded in Prayagraj in {COMPANY_INFO.established}, <strong>{COMPANY_INFO.name}</strong> ({COMPANY_INFO.hindiName}) has grown from a prominent local bhatta at Jhusi into the premier manufacturer of heavy-strength Red Clay and eco-friendly Fly Ash structural blocks in eastern Uttar Pradesh. Sourced from the fertile, iron-rich silt beds of the Ganga-Yamuna planes, our products possess an naturally resilient load-bearing profile.
            </p>
            <p className="text-stone-600 leading-relaxed mb-8 text-sm sm:text-base">
              We leverage mechanized soil extruders, automated quality separators, and environment-compliant low-emission kilns to produce high-density bricks that reduce mortar requirements by up to 20%. Today, we supply construction materials to multi-story real estate builders, warehouse grids, and regional state infrastructures across 10+ districts of Uttar Pradesh.
            </p>

            {/* Core Values minimal grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-orange-100 text-brick-primary mt-0.5">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">BIS certified strength</h4>
                  <p className="text-xs text-stone-500">Every dispatch matches parameters of Class-I brick loads.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-orange-100 text-brick-primary mt-0.5">
                  <Landmark className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Jhusi Railway Proximity</h4>
                  <p className="text-xs text-stone-500">Strategically sited near Jhusi station for expedited truck departures.</p>
                </div>
              </div>
            </div>

            {/* Stats Counter List */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS_COUNTERS.map((stat) => (
                <StatCounter
                  key={stat.label}
                  target={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Column: Visual illustration panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient Backing Block Graphic */}
            <div className="absolute -top-4 -left-4 w-72 h-72 rounded-2xl bg-orange-100/60 -z-10" />
            <div className="absolute -bottom-4 -right-4 w-72 h-72 rounded-2xl bg-brick-primary/5 -z-10" />

            <div className="relative rounded-xl overflow-hidden shadow-xl border-4 border-white bg-stone-100 aspect-[4/5] object-cover">
              <img
                src="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=800"
                alt="Finest fired building bricks piled orderly at Prayagraj bhatta yard"
                className="w-full h-full object-cover select-none pointer-events-none hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-stone-100 flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-brick-dark text-white flex items-center justify-center font-bold">
                  🧱
                </div>
                <div>
                  <h5 className="text-[10px] font-mono text-stone-500 uppercase tracking-widest leading-none">QUALITY SEAL</h5>
                  <p className="text-xs sm:text-sm font-semibold text-stone-900 mt-1">Ganga-Yamuna Plain Soil Silt</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
