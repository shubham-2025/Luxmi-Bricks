import { Hammer, Cpu, Layers, Columns, Box, Grid as GridIcon, Check, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { PRODUCTS, Product } from "../lib/constants";

export default function Products() {
  const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case "Brick":
        return <Hammer className="w-5 h-5 text-brick-primary" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-brick-primary" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-brick-primary" />;
      case "Split":
        return <Columns className="w-5 h-5 text-brick-primary" />;
      case "Box":
        return <Box className="w-5 h-5 text-brick-primary" />;
      case "Grid":
        return <GridIcon className="w-5 h-5 text-brick-primary" />;
      default:
        return <Hammer className="w-5 h-5 text-brick-primary" />;
    }
  };

  const handleEnquiry = (productName: string) => {
    // Dispatch a custom event to pre-select product in contact form
    const event = new CustomEvent("selectProductEnquiry", { detail: productName });
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="products" className="py-24 bg-stone-100 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title & subtitle */}
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <span className="text-brick-light text-xs font-semibold tracking-widest uppercase mb-2">Our Catalog</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900 leading-tight">
            High Precision Structural Solutions
          </h2>
          <div className="w-16 h-1 bg-brick-primary mt-4 mb-4 rounded-full"></div>
          <p className="text-stone-600 text-sm sm:text-base">
            Engineered using premier clay minerals and automated pressing kilns. Explore our specialized, heavy-duty brick families built for general and custom builds.
          </p>
        </div>

        {/* 3-Column Responsive Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PRODUCTS.map((product: Product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl hover:border-brick-light/50 transition-all duration-300 flex flex-col group"
            >
              {/* Product Image Panel */}
              <div className="relative h-48 overflow-hidden bg-stone-200">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-550 select-none pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Floating Category Tag / Icon */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow border border-stone-100">
                  {getProductIcon(product.iconName)}
                </div>
              </div>

              {/* Core Body */}
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-display font-bold text-stone-900 mb-2 group-hover:text-brick-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-6 flex-grow">
                  {product.description}
                </p>

                {/* Key Bullet Features */}
                <ul className="mb-6 space-y-2 border-t border-stone-100 pt-4">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-stone-600 text-xs font-medium">
                      <Check className="w-3.5 h-3.5 text-brick-light flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Enquire Now CTA link page scroll */}
                <button
                  onClick={() => handleEnquiry(product.name)}
                  className="w-full flex items-center justify-center gap-2 bg-stone-50 hover:bg-brick-primary text-stone-800 hover:text-white font-semibold text-xs uppercase tracking-wider py-3.5 px-4 rounded border border-stone-200 hover:border-brick-primary transition-all duration-200 group-hover:border-brick-primary-300"
                >
                  Enquire Now
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
