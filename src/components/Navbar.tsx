import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { NAV_LINKS, COMPANY_INFO } from "../lib/constants";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scroll for header background & top progress bar
  useEffect(() => {
    const handleScroll = () => {
      // Background scroll
      setIsScrolled(window.scrollY > 20);

      // Scroll progress percentage calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for highlighting links
  useEffect(() => {
    const sections = NAV_LINKS.map((link) => {
      const id = link.href.slice(1);
      return document.getElementById(id);
    }).filter((section): section is HTMLElement => section !== null);

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // triggers when section occupies the sweet middle spot
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(`#${entry.target.id}`);
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.slice(1);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of the navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveLink(href);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Scroll Progress Bar at very top of screen */}
      <div 
        className="fixed left-0 h-1 bg-gradient-to-r from-brick-primary via-orange-400 to-amber-300 z-[70] transition-all duration-100"
        style={{ width: `${scrollProgress}%`, top: isScrolled ? "0px" : "var(--announcement-bar-height, 0px)" }}
        id="scroll-progress-bar"
      />

      <header
        id="app-navbar"
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-stone-950/95 backdrop-blur-md border-b border-stone-850 py-3 shadow-lg"
            : "bg-transparent py-5"
        }`}
        style={{ top: isScrolled ? "0px" : "var(--announcement-bar-height, 0px)" }} // fits clean and clear with or without announcement bar
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, "#home")}
              className="flex items-center gap-2.5 group focus:outline-none"
              id="navbar-logo"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded bg-brick-primary shadow-md group-hover:bg-brick-light transition-colors duration-200">
                <span className="text-white text-xl font-display font-extrabold">L</span>
                <div className="absolute -bottom-1 -right-1 w-4 h-2 bg-brick-dark rounded-sm border border-white/20"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-display text-base sm:text-lg font-bold tracking-tight leading-none group-hover:text-brick-light transition-all duration-200">
                  {COMPANY_INFO.name}
                </span>
                <span className="text-brick-light text-[10px] font-semibold tracking-wider mt-0.5 font-display flex items-center gap-1">
                  {COMPANY_INFO.hindiName} • Prayagraj
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-4 xl:gap-6" id="desktop-nav">
              <ul className="flex items-center gap-0.5 xl:gap-1.5 flex-nowrap shrink-0">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`relative px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors duration-200 rounded ${
                        activeLink === link.href
                          ? "text-brick-light text-white"
                          : "text-stone-300 hover:text-white"
                      }`}
                    >
                      {link.name}
                      {activeLink === link.href && (
                        <motion.span
                          layoutId="activeIndicator"
                          className="absolute bottom-0 left-2.5 right-2.5 xl:left-3 xl:right-3 h-0.5 bg-brick-light"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "#contact")}
                className="flex items-center gap-1 bg-brick-primary hover:bg-brick-light text-white text-[10px] font-bold uppercase tracking-widest py-2.5 px-4.5 rounded transition-all duration-200 shrink-0 focus:ring-1 focus:ring-brick-light focus:outline-none"
                id="header-cta"
              >
                REQUEST QUOTE
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded text-stone-300 hover:text-white hover:bg-stone-850 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
              aria-expanded={isMobileMenuOpen}
              id="mobile-menu-btn"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Slide-In) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black xl:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-full bg-stone-950 border-l border-stone-850 p-6 flex flex-col justify-between shadow-2xl xl:hidden"
            >
              <div>
                {/* Header inside drawer */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-900">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-brick-primary flex items-center justify-center font-bold text-white text-base">
                      L
                    </div>
                    <span className="text-white font-display font-bold text-base">
                      {COMPANY_INFO.name}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-full bg-stone-900 text-stone-400 hover:text-white border border-stone-800 focus:outline-none"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Nav list */}
                <nav className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                        activeLink === link.href
                          ? "bg-brick-primary/15 text-brick-light font-bold"
                          : "text-stone-300 hover:bg-stone-900/50 hover:text-white"
                      }`}
                    >
                      {link.name}
                      {activeLink === link.href && (
                        <span className="w-1.5 h-1.5 rounded-full bg-brick-light"></span>
                      )}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Drawer Footer Info */}
              <div className="pt-6 border-t border-stone-900 flex flex-col gap-3">
                <span className="text-stone-500 text-xs font-mono">PRAYAGRAJ INQUIRY</span>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="text-stone-300 hover:text-white text-xs"
                >
                  {COMPANY_INFO.phone}
                </a>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-stone-300 hover:text-white text-xs truncate"
                >
                  {COMPANY_INFO.email}
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, "#contact")}
                  className="mt-2 text-center bg-brick-primary hover:bg-brick-light text-white text-xs font-bold tracking-widest uppercase py-3 px-4 rounded transition-colors duration-200"
                >
                  Request Quote
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
