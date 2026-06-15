import React from "react";
import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import About from "./components/About";
import Products from "./components/Products";
import BrickComparison from "./components/BrickComparison";
import PriceCalculator from "./components/PriceCalculator";
import FactoryVideo from "./components/FactoryVideo";
import Gallery from "./components/Gallery";
import WhyUs from "./components/WhyUs";
import DeliveryMap from "./components/DeliveryMap";
import Testimonials from "./components/Testimonials";
import FaqSection from "./components/FaqSection";
import MapSection from "./components/MapSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import QuickEnquiryPopup from "./components/QuickEnquiryPopup";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import BackToTop from "./components/BackToTop";

export default function App() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LUXMI BRICK FIELD",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Banaras Road, Garapur, Jhusi",
      "addressLocality": "Prayagraj",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "211013",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.4358,
      "longitude": 81.9621
    },
    "openingHours": "Mo-Sa 08:00-18:00",
    "priceRange": "₹₹"
  };

  return (
    <div className="relative min-h-screen bg-stone-50 text-stone-850 selection:bg-brick-primary selection:text-white" id="app-root-container">
      {/* Local Business Schema Markup for SEO Validation */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Sticky dismissible summer bulk offer banner */}
      <AnnouncementBar />

      {/* Dynamic Navigation with top progress tracking bar */}
      <Navbar />

      {/* Main Single Scrollable Body */}
      <main>
        {/* Hero Banner Section */}
        <Hero />

        {/* Auto scrolling trust badges marquee */}
        <TrustStrip />

        {/* Heritage & Regional Sourcing Narrative */}
        <About />

        {/* Product Catalogue Grid */}
        <Products />

        {/* Interactive Brick Type technical parameter matrix */}
        <BrickComparison />

        {/* Interactive material demand, cost & discount calculator */}
        <PriceCalculator />

        {/* Interactive Factory Video Walkthrough tour */}
        <FactoryVideo />

        {/* Dynamic Pagination Gallery with Skeleton shimmers */}
        <Gallery />

        {/* Core USP Badges list */}
        <WhyUs />

        {/* Active Purvanchal Delivery districts chip list */}
        <DeliveryMap />

        {/* Regional Client Builders & Architects Reviews */}
        <Testimonials />

        {/* Exclusive single-open FAQ interactive accords */}
        <FaqSection />

        {/* Embedded physical Maps directions finder card */}
        <MapSection />

        {/* Customized site specification estimate form */}
        <Contact />
      </main>

      {/* Persistent Footer with clickable GPS Thumbnail navigation */}
      <Footer />

      {/* WhatsApp exit-intent / 8-secs delay quote form popup modal */}
      <QuickEnquiryPopup />

      {/* Floating Utilities */}
      <FloatingWhatsApp />
      <BackToTop />
    </div>
  );
}
