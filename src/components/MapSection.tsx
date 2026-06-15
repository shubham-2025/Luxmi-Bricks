import React from "react";
import { MapPin, Phone, Mail, Clock, MessageSquare, ArrowUpRight, Home } from "lucide-react";
import { motion } from "motion/react";
import { COMPANY_INFO } from "../lib/constants";

export default function MapSection() {
  return (
    <section id="map-section" className="py-24 bg-stone-50 overflow-hidden border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="flex flex-col mb-16 max-w-3xl">
          <span className="text-brick-light text-xs font-semibold tracking-widest uppercase mb-2">Our physical hub</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900 leading-tight">
            Visit Our Manufacturing Factory & Bhatta
          </h2>
          <div className="w-16 h-1 bg-brick-primary mt-4 rounded-full"></div>
        </div>

        {/* Two Columns Map & Information Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch" id="factory-map-columns">
          
          {/* Left Column: Map Container */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-xl overflow-hidden shadow-lg border border-stone-200 bg-stone-100 min-h-[350px] lg:min-h-full"
          >
            <iframe
              src="https://maps.google.com/maps?q=Banaras+Rd,+Garapur,+Jhusi,+Prayagraj,+Uttar+Pradesh+211013,+India&output=embed"
              width="100%"
              height="100%"
              className="w-full h-full min-h-[400px]"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Luxmi Brick Field Bhatta Factory Map Prayagraj"
            />
          </motion.div>

          {/* Right Column: Information Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col justify-between bg-white rounded-xl border border-stone-200 p-8 sm:p-10 shadow-md"
          >
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-stone-900 pb-4 border-b border-stone-100">
                {COMPANY_INFO.name} Office
              </h3>

              {/* Address card */}
              <div className="flex gap-4">
                <div className="p-2.5 rounded-lg bg-orange-50 text-brick-primary h-fit shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-stone-500 text-xs font-mono tracking-widest uppercase">FACTORY LOCATION</h4>
                  <p className="text-stone-800 text-sm font-semibold mt-1 leading-relaxed">
                    {COMPANY_INFO.address}
                  </p>
                  <p className="text-brick-primary text-xs mt-1.5 font-medium flex items-center gap-1">
                    <Home className="w-3.5 h-3.5" /> Landmark: {COMPANY_INFO.landmark}
                  </p>
                </div>
              </div>

              {/* Phone card */}
              <div className="flex gap-4">
                <div className="p-2.5 rounded-lg bg-orange-50 text-brick-primary h-fit shrink-0">
                  <Phone className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-stone-500 text-xs font-mono tracking-widest uppercase">CALL DISPATCH</h4>
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="text-brick-primary hover:text-brick-light text-base sm:text-lg font-bold mt-1 inline-block hover:underline"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Email card */}
              <div className="flex gap-4">
                <div className="p-2.5 rounded-lg bg-orange-50 text-brick-primary h-fit shrink-0">
                  <Mail className="w-5 h-5 font-bold" />
                </div>
                <div>
                  <h4 className="text-stone-500 text-xs font-mono tracking-widest uppercase">EMAIL CORRESPONDENCE</h4>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-stone-700 hover:text-brick-primary text-sm font-medium mt-1 inline-block truncate hover:underline"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              {/* Working Hours card */}
              <div className="flex gap-4 font-sans">
                <div className="p-2.5 rounded-lg bg-orange-50 text-brick-primary h-fit shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-stone-500 text-xs font-mono tracking-widest uppercase">FACTORY WORKING HOURS</h4>
                  <p className="text-stone-700 text-sm font-medium mt-1">
                    {COMPANY_INFO.hours}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick action buttons row */}
            <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row gap-3">
              <a
                href={`${COMPANY_INFO.whatsappLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest py-3.5 px-5 rounded shadow-sm hover:shadow-md transition-all duration-200"
              >
                <MessageSquare className="w-4 h-4 fill-white text-white" />
                Quick WhatsApp
              </a>
              <a
                href={`${COMPANY_INFO.directionLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 bg-stone-50 hover:bg-stone-100 text-stone-800 font-bold text-xs uppercase tracking-widest py-3.5 px-5 rounded border border-stone-200 transition-all duration-200"
                id="get-gps-directions-btn"
              >
                Get Directions
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
