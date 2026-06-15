import React, { useState, useEffect } from "react";
import { Calculator, ArrowRight, Table, Sparkles, Building, Info } from "lucide-react";
import { PRODUCTS } from "../lib/constants";

export default function PriceCalculator() {
  const [calculationMode, setCalculationMode] = useState<"area" | "quantity">("quantity");
  const [areaInput, setAreaInput] = useState<string>("800");
  const [quantityInput, setQuantityInput] = useState<string>("8000");
  const [brickSelection, setBrickSelection] = useState<string>("Red Clay Bricks");
  const [qtyTier, setQtyTier] = useState<"low" | "medium" | "bulk">("medium");

  const [bricksNeeded, setBricksNeeded] = useState<number>(8000);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 52000, max: 64000 });
  const [bulkSavings, setBulkSavings] = useState<number>(4800);

  // Re-calculate math whenever state triggers change
  useEffect(() => {
    let finalQty = 0;
    if (calculationMode === "area") {
      const area = parseFloat(areaInput) || 0;
      // Formula: ~10 bricks per sq. ft. for a standard durable 9-inch wall
      finalQty = Math.ceil(area * 10);
    } else {
      finalQty = parseInt(quantityInput) || 0;
    }

    // Set qty tier automatically based on quantity, or sync from state selector
    // If they change quantity, we update the tier indicator
    if (finalQty < 1000) {
      setQtyTier("low");
    } else if (finalQty >= 1000 && finalQty < 10000) {
      setQtyTier("medium");
    } else {
      setQtyTier("bulk");
    }

    // Pricing formulas
    let baseMin = 6;
    let baseMax = 8;

    if (brickSelection === "Fly Ash Bricks") {
      baseMin = 7;
      baseMax = 9;
    } else if (brickSelection === "Exposed Face Bricks") {
      baseMin = 12;
      baseMax = 18;
    } else if (brickSelection === "Wire Cut Bricks") {
      baseMin = 8;
      baseMax = 10;
    } else if (brickSelection === "Hollow Bricks") {
      baseMin = 15;
      baseMax = 22;
    } else if (brickSelection === "Cladding Tiles") {
      baseMin = 14;
      baseMax = 20;
    }

    // Apply tier adjustments
    let tierMultiplier = 1.0;
    let calculatedSavings = 0;

    if (finalQty < 1000) {
      tierMultiplier = 1.08; // slightly higher retail price for small batches
    } else if (finalQty >= 1000 && finalQty < 10000) {
      tierMultiplier = 1.0;  // flat base
      calculatedSavings = Math.round(finalQty * 0.25); // tiny savings
    } else {
      tierMultiplier = 0.90; // 10% wholesale bulk discount
      calculatedSavings = Math.round(finalQty * (baseMin * 0.12)); 
    }

    setBricksNeeded(finalQty);
    setPriceRange({
      min: Math.round(finalQty * baseMin * tierMultiplier),
      max: Math.round(finalQty * baseMax * tierMultiplier)
    });
    setBulkSavings(calculatedSavings);

  }, [calculationMode, areaInput, quantityInput, brickSelection, qtyTier]);

  const handleConsultationRedirect = () => {
    // Select the category in the contact form
    const event = new CustomEvent("selectProductEnquiry", { detail: brickSelection });
    window.dispatchEvent(event);

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
    <section id="calculator" className="py-24 bg-stone-900 text-white relative border-b border-stone-950">
      {/* Texture */}
      <div className="absolute inset-0 brick-texture-overlay opacity-5 pointer-events-none" />
      <div className="absolute top-[20%] left-[10%] w-[35%] h-[35%] rounded-full bg-brick-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <span className="text-brick-light text-xs font-semibold tracking-widest uppercase mb-2">Estimate Your Load</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight">
            Interactive Price & Load Estimator
          </h2>
          <div className="w-16 h-1 bg-brick-primary mt-4 mb-4 rounded-full"></div>
          <p className="text-stone-400 text-sm sm:text-base">
            Instantly compute the approximate quantity of bricks required and view direct factory wholesale price estimates with volume metrics.
          </p>
        </div>

        {/* Core widget layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Inputs Column */}
          <div className="lg:col-span-6 bg-stone-850 border border-stone-805 p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-lg font-display font-medium text-white pb-3 border-b border-stone-800 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-brick-light" />
                Configure Dimensions
              </h3>

              {/* Mode Toggle */}
              <div>
                <label className="block text-stone-400 text-xs font-mono tracking-wider uppercase mb-3">
                  Calculation Mode
                </label>
                <div className="grid grid-cols-2 p-1 bg-stone-900 rounded-lg border border-stone-800">
                  <button
                    onClick={() => setCalculationMode("quantity")}
                    className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded transition-all duration-200 ${
                      calculationMode === "quantity"
                        ? "bg-brick-primary text-white shadow-md"
                        : "text-stone-400 hover:text-white"
                    }`}
                  >
                    Exact Bricks Count
                  </button>
                  <button
                    onClick={() => setCalculationMode("area")}
                    className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded transition-all duration-200 ${
                      calculationMode === "area"
                        ? "bg-brick-primary text-white shadow-md"
                        : "text-stone-400 hover:text-white"
                    }`}
                  >
                    Plot Area (Sq. Ft.)
                  </button>
                </div>
              </div>

              {/* Dynamic Input field */}
              {calculationMode === "area" ? (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-stone-300 text-xs font-semibold uppercase tracking-wider">
                      Constructed Wall Area (Sq. Ft.)
                    </label>
                    <span className="text-stone-500 text-[10px] font-mono">Formula: Wall Area × 10</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={areaInput}
                      onChange={(e) => setAreaInput(e.target.value)}
                      min="1"
                      className="w-full bg-stone-900 border border-stone-750 px-4 py-3 rounded-lg text-white font-mono focus:border-brick-light focus:outline-none"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 font-mono text-sm leading-none">Sq Ft</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-stone-300 text-xs font-semibold uppercase tracking-wider">
                      Total Bricks Needed
                    </label>
                    <span className="text-stone-500 text-[10px] font-mono">Minimum order: 1000</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={quantityInput}
                      onChange={(e) => setQuantityInput(e.target.value)}
                      min="100"
                      step="500"
                      className="w-full bg-stone-900 border border-stone-750 px-4 py-3 rounded-lg text-white font-mono focus:border-brick-light focus:outline-none"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 font-mono text-sm leading-none">Pcs</span>
                  </div>
                </div>
              )}

              {/* Material Selection */}
              <div>
                <label className="block text-stone-300 text-xs font-semibold uppercase tracking-wider mb-2">
                  Structural Brick Material
                </label>
                <select
                  value={brickSelection}
                  onChange={(e) => setBrickSelection(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-750 px-4 py-3.5 rounded-lg text-white text-sm focus:border-brick-light focus:outline-none"
                >
                  {PRODUCTS.map((prod) => (
                    <option key={prod.id} value={prod.name}>
                      {prod.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity tier cards */}
              <div>
                <label className="block text-stone-400 text-xs font-mono tracking-wider uppercase mb-2">Selected Volume Class</label>
                <div className="grid grid-cols-3 gap-2">
                  <div 
                    className={`p-2.5 rounded-lg border text-center transition-colors ${
                      qtyTier === "low" 
                        ? "bg-amber-950/20 border-amber-600/50 text-amber-300" 
                        : "bg-stone-900 border-stone-800 text-stone-500"
                    }`}
                  >
                    <span className="block text-[10px] font-bold uppercase tracking-wider">Retail</span>
                    <span className="block text-xs font-mono mt-0.5">&lt; 1,000</span>
                  </div>
                  <div 
                    className={`p-2.5 rounded-lg border text-center transition-colors ${
                      qtyTier === "medium" 
                        ? "bg-orange-950/20 border-brick-primary/50 text-brick-light" 
                        : "bg-stone-900 border-stone-800 text-stone-500"
                    }`}
                  >
                    <span className="block text-[10px] font-bold uppercase tracking-wider">Standard</span>
                    <span className="block text-xs font-mono mt-0.5">1k - 10k</span>
                  </div>
                  <div 
                    className={`p-2.5 rounded-lg border text-center transition-all ${
                      qtyTier === "bulk" 
                        ? "bg-emerald-950/20 border-emerald-500/50 text-emerald-400 font-semibold shadow-inner" 
                        : "bg-stone-900 border-stone-800 text-stone-500"
                    }`}
                  >
                    <span className="block text-[10px] font-bold uppercase tracking-wider">Bulk (Save)</span>
                    <span className="block text-xs font-mono mt-0.5">10k+</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Note info label */}
            <div className="flex gap-2.5 items-start mt-6 p-3 bg-stone-900 rounded-lg text-xs text-stone-500 border border-stone-850">
              <Info className="w-4 h-4 text-brick-primary shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Calculations are indicative. Values represent ex-factory base prices. Multi-district trucks loading, VAT, and transit E-Way fees will be applied during final quotation.
              </p>
            </div>
          </div>

          {/* Output Display Column */}
          <div className="lg:col-span-6 bg-stone-950 border-2 border-brick-primary/20 p-6 sm:p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Building className="w-40 h-40" />
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-display font-medium text-white flex items-center gap-1.5">
                  <Sparkles className="w-5 h-5 text-brick-light animate-pulse" />
                  Estimated Material Bill
                </h3>
                <span className="inline-flex px-2 py-1 rounded bg-brick-dark/40 border border-brick-primary/30 text-brick-light text-[10px] font-mono font-bold uppercase tracking-widest">
                  ESTIMATE
                </span>
              </div>

              {/* Quantitative output */}
              <div className="grid grid-cols-2 gap-4 pb-6 border-b border-stone-800/80">
                <div>
                  <span className="block text-stone-500 text-xs uppercase tracking-wider">Bricks Count</span>
                  <span className="text-2xl font-mono font-bold text-white mt-1 block">
                    {bricksNeeded.toLocaleString()}
                    <span className="text-xs font-sans text-stone-400 font-medium ml-1">Pcs</span>
                  </span>
                </div>
                <div>
                  <span className="block text-stone-500 text-xs uppercase tracking-wider">Selected Type</span>
                  <span className="text-sm font-display font-bold text-brick-light mt-2 block truncate">
                    {brickSelection}
                  </span>
                </div>
              </div>

              {/* Price Range display */}
              <div className="bg-stone-900 border border-stone-850 p-6 rounded-xl text-center">
                <span className="block text-stone-400 text-xs font-mono tracking-widest uppercase">Approximate Total Price</span>
                <span className="text-3xl sm:text-4xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cream to-amber-200 mt-2 block">
                  ₹{priceRange.min.toLocaleString()} - ₹{priceRange.max.toLocaleString()}
                </span>
                <span className="text-xs text-stone-500 block mt-1.5">Excludes regional freight charges</span>
              </div>

              {/* Special volume discounts output if any */}
              {bulkSavings > 0 ? (
                <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Volume Discount Savings</span>
                  </div>
                  <span className="text-base font-mono font-bold text-emerald-400">
                    - ₹{bulkSavings.toLocaleString()}
                  </span>
                </div>
              ) : (
                <div className="p-4 bg-stone-900 rounded-xl text-center text-xs text-stone-500 border border-stone-850">
                  Order 10,000+ units to unlock <strong>10% wholesale bulk discounts</strong>!
                </div>
              )}
            </div>

            {/* Request consultation button */}
            <div className="mt-8">
              <button
                onClick={handleConsultationRedirect}
                className="w-full flex items-center justify-center gap-2 bg-brick-primary hover:bg-brick-light text-white font-bold text-xs uppercase tracking-widest py-4 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-orange-700/20 hover:scale-[1.01]"
                id="estimator-calc-cta"
              >
                Request Custom Freight Quote
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
