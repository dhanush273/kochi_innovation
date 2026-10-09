import React from 'react';
import { MapPin, ArrowRight, ExternalLink } from 'lucide-react';
import FadeIn from './FadeIn';

export default function VenueSection({ venue }) {
  const {
    name = " Holiday Inn Cochin, an IHG Hotel ",
    address = " A Junction, 33/1739, National Highway Bypass, Chakkaraparambu, Vennala, Kochi, Ernakulam, Keralam 682028",
    directionsUrl = "https://maps.app.goo.gl/qM3s5tKe4sj4mSwo7",
    imageUrl = "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkD101tjl_C92FsvKQf1xGDk3z-pEuVeaHyRDq3sSq8mj1Zcj3b0GNv8_ImN3gHut2Hu5h_0bUT0HaGaMjRcfY_poaG8blSWDtG1Teinh9c8Jdqm7NFD-8rSyNSt_U_-i4jAa4qSA=s1360-w1360-h1020-rw"
  } = venue || {};

  return (
    <div id="venue" className="space-y-6">
      {/* Section Header */}
      <FadeIn direction="up">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-1 bg-brand-red rounded-full"></span>
            <span className="text-xs font-black uppercase tracking-widest text-brand-red">
              VENUE
            </span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            {name}
          </h2>
          <div className="flex items-center gap-1.5 text-slate-500 text-sm mt-1">
            <MapPin className="w-4 h-4 text-brand-red flex-shrink-0" />
            <span>{address}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-brand-red text-brand-red font-bold text-xs uppercase tracking-wider hover:bg-brand-red hover:text-white transition-all group"
          >
            <span>Get Directions</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </FadeIn>

      {/* Building Image with Modern Angled Cut Frame */}
      <FadeIn direction="up" delay={150}>
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 mt-4 group">
          <div className="aspect-[16/10] overflow-hidden bg-slate-100">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800';
              }}
            />
          </div>
          
          {/* Dynamic Angled Red Wing Accent matching the flyer */}
          <div 
            className="absolute -bottom-1 -right-1 w-32 h-32 bg-gradient-to-tl from-brand-red to-red-600 pointer-events-none opacity-90 hidden sm:block"
            style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
          ></div>

        {/* Location Badge */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 shadow-md flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-brand-red"></span>
          Holiday Inn Cochin, an IHG Hotel
        </div>
        </div>
      </FadeIn>
    </div>
  );
}
