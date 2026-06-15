import React, { useState } from "react";
import { Play, Film, Sparkles, Youtube, Info } from "lucide-react";

export default function FactoryVideo() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 bg-stone-950 text-white relative border-b border-stone-900" id="factory-video">
      {/* Warm ambient radial gradient behind content */}
      <div className="absolute inset-0 bg-gradient-radial from-brick-dark/15 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-900 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-12 max-w-2xl mx-auto">
          <span className="text-brick-light text-xs font-semibold tracking-widest uppercase mb-2">Live Production tour</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight">
            See Our Factory in Action
          </h2>
          <div className="w-16 h-1 bg-brick-primary mt-4 mb-4 rounded-full"></div>
          <p className="text-stone-400 text-sm sm:text-base">
            Take an inside look at how Ganga silt soil is mixed, extruded, wire-cut, and baked at standard 1000°C temperatures inside our Prayagraj kiln.
          </p>
        </div>

        {/* Video Player Display Container */}
        <div className="max-w-3xl mx-auto relative rounded-2xl overflow-hidden shadow-2xl border-2 border-stone-800 bg-stone-900 aspect-video group">
          
          {/* Lazy iframe embed, rendered only on active click or initialized securely */}
          {isPlaying ? (
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
              title="Luxmi Brick Field Factory Tour Video"
              width="100%"
              height="100%"
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            /* Custom Interactive Thumbnail Overlay */
            <div className="absolute inset-0 w-full h-full cursor-pointer relative flex items-center justify-center transition-transform duration-500 overflow-hidden">
              
              {/* Fallback mock image from unsplash (brick manufacturing layout look) */}
              <img
                src="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=1200"
                alt="Luxmi Brick Field Brick kiln firing workspace"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
                referrerPolicy="no-referrer"
              />
              
              {/* Warm Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent opacity-80" />

              {/* Decorative tags */}
              <div className="absolute top-4 left-4 bg-stone-900/90 border border-stone-800 backdrop-blur px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-mono font-semibold uppercase text-stone-200">
                <Film className="w-3.5 h-3.5 text-brick-light" />
                <span>KILN OPERATION TOUR</span>
              </div>

              {/* Play Button Badge */}
              <button
                onClick={() => setIsPlaying(true)}
                className="relative z-10 w-20 h-20 bg-brick-primary hover:bg-brick-light text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform group-hover:scale-110 active:scale-95 shadow-orange-600/30"
                aria-label="Play factory tour video"
              >
                <Play className="w-8 h-8 fill-white ml-1 text-white" />
              </button>

              {/* Footer play badge */}
              <div className="absolute bottom-6 text-center z-10 w-full px-4">
                <span className="text-sm font-display font-medium text-cream flex items-center justify-center gap-1">
                  <Youtube className="w-4 h-4 text-red-500 fill-red-500" />
                  Click to start interactive walkthrough
                </span>
                <span className="text-[10px] text-stone-400 font-mono mt-1 block">Length: 2 mins • 1080p stream</span>
              </div>

            </div>
          )}

        </div>

        {/* Cues tag and instruction banner */}
        <div className="max-w-2xl mx-auto mt-6 bg-stone-900/40 border border-stone-800 rounded-lg p-3.5 flex items-start gap-2.5 text-stone-400 text-xs">
          <Info className="w-4 h-4 text-brick-light shrink-0 mt-0.5" />
          <div>
            <p className="leading-relaxed">
              <strong className="text-stone-300">Note for Developers:</strong> This is a custom placeholder video frame. Replace the source embed key inside <code className="font-mono text-brick-light px-1.5 py-0.5 bg-stone-950 rounded">FactoryVideo.tsx</code> with your actual factory reel, YouTube link, or Google Drive asset to personalize it.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
