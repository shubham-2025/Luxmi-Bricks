import React, { useState, useEffect } from "react";
import { X, Send, MessageCircleCode, CheckCircle, Smartphone, AlertCircle, ShoppingBag } from "lucide-react";
import { COMPANY_INFO, PRODUCTS } from "../lib/constants";

export default function QuickEnquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [brickType, setBrickType] = useState(PRODUCTS[0].name);
  const [quantity, setQuantity] = useState("5000");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    // 1. Check local storage for dismissal
    const dismissedAt = localStorage.getItem("luxmi_whatsapp_popup_dismissed");
    if (dismissedAt) {
      const parsedTime = parseInt(dismissedAt);
      const oneDayMs = 24 * 60 * 60 * 1000;
      if (Date.now() - parsedTime < oneDayMs) {
        return; // Skip showing within 24 hours
      }
    }

    // 2. Timer trigger - 8 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 8000);

    // 3. Exit Intent trigger - mouse leaves top boundary
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 5) {
        setIsOpen(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Mark dismissal timestamp to snooze for 24 hours
    localStorage.setItem("luxmi_whatsapp_popup_dismissed", Date.now().toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setValidationError("Please input your Name");
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setValidationError("Please input a valid 10-digit Phone identifier");
      return;
    }

    setValidationError("");

    // Build the WhatsApp message template
    const rawText = `Hi, I need a quote for ${brickType} - ${quantity} bricks. Name: ${name}, Phone: ${phone}`;
    const encodedText = encodeURIComponent(rawText);
    const waUrl = `https://wa.me/919876543210?text=${encodedText}`;

    // Open WhatsApp
    window.open(waUrl, "_blank", "referrerpolicy=no-referrer");

    // Close and flag as submitted (dismissed)
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-[90] animate-fade-in"
      id="whatsapp-enquiry-modal-backdrop"
    >
      <div 
        className="bg-stone-900 border-2 border-brick-primary/30 text-white rounded-2xl w-full max-w-md overflow-hidden relative shadow-2xl transform transition-transform duration-300 scale-100"
        id="whatsapp-enquiry-modal"
      >
        
        {/* Upper Accent Header */}
        <div className="bg-gradient-to-r from-brick-dark to-stone-900 p-5 pr-12 relative border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
              <MessageCircleCode className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-display font-bold text-white tracking-wide">
                Get a Quick Quote on WhatsApp
              </h3>
              <p className="text-stone-300 text-xs mt-0.5">
                Takes 30 seconds • Direct vendor connection
              </p>
            </div>
          </div>
          
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-1.5 rounded-full hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
            aria-label="Close quote modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {validationError && (
            <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-lg text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Name Field */}
          <div>
            <label className="block text-stone-400 text-xs font-mono tracking-wider uppercase mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Shailesh Tripathi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 px-3.5 py-2.5 rounded-lg text-sm text-white focus:border-brick-light focus:outline-none focus:ring-1 focus:ring-brick-light/20"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-stone-400 text-xs font-mono tracking-wider uppercase mb-1.5">
              WhatsApp Mobile Number
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500 text-sm font-mono leading-none">+91</span>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                placeholder="9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                className="w-full bg-stone-950 border border-stone-800 pl-12 pr-3.5 py-2.5 rounded-lg text-sm text-white focus:border-brick-light focus:outline-none focus:ring-1 focus:ring-brick-light/20 font-mono"
              />
            </div>
          </div>

          {/* Grid fields */}
          <div className="grid grid-cols-2 gap-3">
            {/* Brick Select */}
            <div>
              <label className="block text-stone-400 text-xs font-mono tracking-wider uppercase mb-1.5">
                Brick Class
              </label>
              <select
                value={brickType}
                onChange={(e) => setBrickType(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 px-3 py-2.5 rounded-lg text-xs text-white focus:border-brick-light focus:outline-none"
              >
                {PRODUCTS.map((prod) => (
                  <option key={prod.id} value={prod.name}>
                    {prod.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity select */}
            <div>
              <label className="block text-stone-400 text-xs font-mono tracking-wider uppercase mb-1.5">
                Quantity Pcs
              </label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 px-3 py-2.5 rounded-lg text-xs text-white focus:border-brick-light focus:outline-none font-mono"
              >
                <option value="Less than 1000">&lt; 1,000</option>
                <option value="1000 - 5000">1,000 - 5,000</option>
                <option value="5000 - 10000">5,000 - 10,000</option>
                <option value="10000 - 25000">10,000 - 25,000</option>
                <option value="25000+">25,000+ (Bulk)</option>
              </select>
            </div>
          </div>

          {/* Disclaimer text */}
          <div className="p-3 bg-stone-950/50 border border-stone-850 rounded-lg text-[10px] text-stone-500 flex items-start gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
            <p>
              Your contact details are encrypted locally and routed securely over official WhatsApp API transit nodes. We do not distribute developer spam.
            </p>
          </div>

          {/* Submit btn */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest py-3 px-5 rounded-lg transition-colors group mt-2 shadow-lg hover:shadow-emerald-900/10"
            id="modal-whatsapp-send"
          >
            <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            Connect & Send on WhatsApp
          </button>
        </form>

      </div>
    </div>
  );
}
