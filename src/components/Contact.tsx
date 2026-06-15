import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Facebook, Instagram, Youtube, Linkedin, Loader2, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { COMPANY_INFO, PRODUCTS } from "../lib/constants";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "Prayagraj", // default preset for regional target
    productInterest: "Red Clay Bricks", // default selection
    message: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Listen to product enquiry clicks to auto-select option
  useEffect(() => {
    const handleProductSelect = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail) {
        setFormData((prev) => ({
          ...prev,
          productInterest: customEvent.detail
        }));
      }
    };

    window.addEventListener("selectProductEnquiry", handleProductSelect);
    return () => {
      window.removeEventListener("selectProductEnquiry", handleProductSelect);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate server submission
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      // Reset inputs except product interest or default state variables
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        city: "Prayagraj",
        productInterest: formData.productInterest,
        message: ""
      });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-stone-100 relative overflow-hidden border-t border-stone-200">
      {/* Abstract patterns */}
      <div className="absolute top-[30%] -right-[15%] w-[45%] h-[45%] rounded-full bg-brick-dark/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section title */}
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <span className="text-brick-light text-xs font-semibold tracking-widest uppercase mb-2">Connect With Us</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900 leading-tight">
            Initiate Your Material Estimate
          </h2>
          <div className="w-16 h-1 bg-brick-primary mt-4 mb-4 rounded-full"></div>
          <p className="text-stone-600 text-sm sm:text-base">
            Submit your structural requirement below. Our regional team near Jhusi, Prayagraj will calculate custom logistics and formulate a commercial wholesale quotation within 24 hours.
          </p>
        </div>

        {/* Form & Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="contact-core-wrapper">
          
          {/* Left: Contact Form Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-8 sm:p-10 shadow-xl flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-stone-900 mb-6">
                Direct Enquiry Request
              </h3>

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="enquiry-form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    id="brick-enquiry-form"
                  >
                    {/* Raw Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-none">
                      <div>
                        <label className="block text-stone-600 text-xs font-semibold uppercase tracking-wider mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-stone-250 text-stone-800 text-sm focus:border-brick-primary focus:ring-1 focus:ring-brick-primary focus:outline-none transition-colors"
                          placeholder="e.g. Alok Tripathi"
                          id="input-fullname"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-600 text-xs font-semibold uppercase tracking-wider mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-stone-250 text-stone-800 text-sm focus:border-brick-primary focus:ring-1 focus:ring-brick-primary focus:outline-none transition-colors"
                          placeholder="e.g. 98765-43210"
                          id="input-phone"
                        />
                      </div>
                    </div>

                    {/* Email & City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-stone-600 text-xs font-semibold uppercase tracking-wider mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-stone-250 text-stone-800 text-sm focus:border-brick-primary focus:ring-1 focus:ring-brick-primary focus:outline-none transition-colors"
                          placeholder="e.g. alok@gmail.com"
                          id="input-email"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-600 text-xs font-semibold uppercase tracking-wider mb-2">
                          Delivery City / District *
                        </label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-stone-250 text-stone-800 text-sm focus:border-brick-primary focus:ring-1 focus:ring-brick-primary focus:outline-none transition-colors"
                          placeholder="e.g. Prayagraj"
                          id="input-city"
                        />
                      </div>
                    </div>

                    {/* Product interest selector drop */}
                    <div>
                      <label className="block text-stone-600 text-xs font-semibold uppercase tracking-wider mb-2">
                        Product of Interest
                      </label>
                      <select
                        name="productInterest"
                        value={formData.productInterest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white rounded-lg border border-stone-250 text-stone-800 text-sm focus:border-brick-primary focus:ring-1 focus:ring-brick-primary focus:outline-none transition-colors cursor-pointer"
                        id="input-productInterest"
                      >
                        {PRODUCTS.map((prod) => (
                          <option key={prod.id} value={prod.name}>
                            {prod.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Detailed message requirements */}
                    <div>
                      <label className="block text-stone-600 text-xs font-semibold uppercase tracking-wider mb-2">
                        Additional Specifications / Estimated Brick Count *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-stone-250 text-stone-800 text-sm focus:border-brick-primary focus:ring-1 focus:ring-brick-primary focus:outline-none transition-colors placeholder:text-stone-400"
                        placeholder="Please indicate total quantity requested (e.g. 15,000 bricks required), construction layout, and target delivery schedule."
                        id="input-message"
                      />
                    </div>

                    {/* Submit cta button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full group py-4 px-6 rounded-lg bg-brick-primary hover:bg-brick-light disabled:bg-stone-400 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brick-primary"
                      id="submit-enquiry-btn"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Calculating Estimate & Transit Cost...
                        </>
                      ) : (
                        <>
                          Submit Enquiry Request
                          <Send className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-form"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="p-8 sm:p-12 text-center bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col items-center justify-center"
                    id="contact-success-panel"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-display font-bold text-stone-900 mb-3">
                      Enquiry Submitted Successfully!
                    </h4>
                    <p className="text-stone-600 text-sm max-w-md leading-relaxed mb-8">
                      Thank you for contacting <strong>{COMPANY_INFO.name}</strong>. We have logged your request in <strong>{formData.productInterest}</strong>. Our logistics unit near Jhusi, Prayagraj will draft a custom rate sheet and call you shortly.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="flex items-center gap-2 bg-stone-900 hover:bg-stone-850 text-white font-semibold text-xs uppercase tracking-wider py-3 px-6 rounded-lg transition-colors focus:outline-none"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Submit Another Query
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right: Contact Information Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            {/* Quick overview stack */}
            <div className="bg-stone-900 text-white rounded-2xl p-8 sm:p-10 shadow-xl space-y-8 flex-grow">
              <h3 className="text-xl sm:text-2xl font-display font-medium border-b border-stone-800 pb-4">
                Corporate Dispatch
              </h3>

              <div className="space-y-6">
                {/* Location */}
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded-lg bg-stone-800 border border-stone-750 text-brick-light flex-shrink-0 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-stone-500 text-[10px] font-mono tracking-widest uppercase">BHATTA YARD hq</span>
                    <p className="text-stone-300 text-sm mt-1 leading-relaxed">
                      {COMPANY_INFO.address}
                    </p>
                    <span className="text-brick-light text-[11px] font-medium block mt-1.5 font-display">
                      📍 {COMPANY_INFO.landmark}
                    </span>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded-lg bg-stone-800 border border-stone-750 text-brick-light flex-shrink-0 mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-stone-500 text-[10px] font-mono tracking-widest uppercase">DIRECT HOTLINE</span>
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="block text-white text-base sm:text-lg font-bold mt-1 hover:text-brick-light transition-colors"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Mail dispatch */}
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded-lg bg-stone-800 border border-stone-750 text-brick-light flex-shrink-0 mt-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-stone-500 text-[10px] font-mono tracking-widest uppercase">RFQ SUBMISSIONS</span>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="block text-stone-300 text-sm mt-1 hover:text-white hover:underline transition-colors truncate"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Channels in dark widget */}
              <div className="pt-6 border-t border-stone-800">
                <h4 className="text-stone-400 text-xs font-mono tracking-widest uppercase mb-4">Official Channels</h4>
                <div className="flex items-center gap-3">
                  <a
                    href={COMPANY_INFO.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-stone-800 hover:bg-brick-primary text-stone-300 hover:text-white rounded-lg border border-stone-750 hover:border-brick-primary transition-all duration-200"
                    aria-label="Facebook Link"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={COMPANY_INFO.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-stone-800 hover:bg-brick-primary text-stone-300 hover:text-white rounded-lg border border-stone-750 hover:border-brick-primary transition-all duration-200"
                    aria-label="Instagram Link"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={COMPANY_INFO.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-stone-800 hover:bg-brick-primary text-stone-300 hover:text-white rounded-lg border border-stone-750 hover:border-brick-primary transition-all duration-200"
                    aria-label="YouTube Link"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a
                    href={COMPANY_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-stone-800 hover:bg-brick-primary text-stone-300 hover:text-white rounded-lg border border-stone-750 hover:border-brick-primary transition-all duration-200"
                    aria-label="LinkedIn Link"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
