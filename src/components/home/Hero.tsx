"use client";

import * as React from 'react';
import {
  FloatingIconsHero,
  type FloatingIconsHeroProps,
} from '@/components/ui/floating-icons-hero-section';

// --- Custom Marketing Icons ---

const IconGoogle = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.9999 12.24C21.9999 11.4933 21.9333 10.76 21.8066 10.0533H12.3333V14.16H17.9533C17.7333 15.3467 17.0133 16.3733 15.9666 17.08V19.68H19.5266C21.1933 18.16 21.9999 15.4533 21.9999 12.24Z" fill="#4285F4"/>
        <path d="M12.3333 22C15.2333 22 17.6866 21.0533 19.5266 19.68L15.9666 17.08C15.0199 17.7333 13.7933 18.16 12.3333 18.16C9.52659 18.16 7.14659 16.28 6.27992 13.84H2.59326V16.5133C4.38659 20.0267 8.05992 22 12.3333 22Z" fill="#34A853"/>
        <path d="M6.2799 13.84C6.07324 13.2267 5.9599 12.58 5.9599 11.92C5.9599 11.26 6.07324 10.6133 6.2799 10L2.59326 7.32667C1.86659 8.78667 1.45326 10.32 1.45326 11.92C1.45326 13.52 1.86659 15.0533 2.59326 16.5133L6.2799 13.84Z" fill="#FBBC05"/>
        <path d="M12.3333 5.68C13.8933 5.68 15.3133 6.22667 16.3866 7.24L19.6 4.02667C17.68 2.29333 15.2266 1.33333 12.3333 1.33333C8.05992 1.33333 4.38659 3.97333 2.59326 7.32667L6.27992 10C7.14659 7.56 9.52659 5.68 12.3333 5.68Z" fill="#EA4335"/>
    </svg>
);

const IconGoogleAds = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.81 12.33L10.61 21.6c.6.72 1.69.72 2.29 0l7.29-8.75c.6-.72.6-1.89 0-2.61L12.9 1.5c-.6-.72-1.69-.72-2.29 0L2.81 9.72c-.6.72-.6 1.89 0 2.61z" fill="#F4B400"/>
        <path d="M11.75 12L7.22 6.56l5.68-1.5 4.53 5.44-5.68 1.5z" fill="#4285F4"/>
    </svg>
);

const IconGoogleLocalServices = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#34A853]" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="M9 12l2 2 4-4"></path>
    </svg>
);

const IconMeta = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0668E1]" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 8c-2.2 0-4 1.8-4 4s1.8 4 4 4c2.2 0 4-1.8 4-4 0-2.2-1.8-4-4-4zm8 0c-2.2 0-4 1.8-4 4 0 2.2 1.8 4 4 4s4-1.8 4-4-1.8-4-4-4z"/>
        <path d="M12 12l4-4M12 12l-4-4"/>
    </svg>
);

const IconInstagram = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#E1306C]" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const IconYouTube = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.582 6.186A2.482 2.482 0 0 0 19.82 4.42C18.1 4 12 4 12 4s-6.1 0-7.82.42c-.98.26-1.74.98-1.762 1.766C2 7.94 2 12 2 12s0 4.06.418 5.814c.022.786.782 1.506 1.762 1.766C6.1 20 12 20 12 20s6.1 0 7.82-.42c.98-.26 1.74-.98 1.762-1.766C22 16.06 22 12 22 12s0-4.06-.418-5.814zM9.75 15.5V8.5L15.75 12 9.75 15.5z" fill="#FF0000"/>
    </svg>
);

// Define the icons with their unique positions for the demo.
const demoIcons: FloatingIconsHeroProps['icons'] = [
  // Marketing specific icons (repeated for visual density)
  { id: 1, icon: IconGoogleAds, className: 'top-[10%] left-[10%]' },
  { id: 2, icon: IconMeta, className: 'top-[20%] right-[10%]' },
  { id: 3, icon: IconInstagram, className: 'top-[80%] left-[15%]' },
  { id: 4, icon: IconYouTube, className: 'bottom-[15%] right-[15%]' },
  { id: 5, icon: IconGoogle, className: 'top-[15%] left-[35%]' },
  { id: 6, icon: IconGoogleLocalServices, className: 'top-[5%] right-[30%]' },
  { id: 7, icon: IconGoogleAds, className: 'bottom-[10%] left-[30%]' },
  { id: 8, icon: IconInstagram, className: 'top-[40%] left-[5%]' },
  { id: 9, icon: IconMeta, className: 'top-[75%] right-[30%]' },
  { id: 10, icon: IconGoogle, className: 'top-[85%] left-[65%]' },
  { id: 11, icon: IconGoogleLocalServices, className: 'top-[50%] right-[5%]' },
  { id: 12, icon: IconYouTube, className: 'top-[55%] left-[10%]' },
];

export default function Hero() {
  return (
    <FloatingIconsHero
      title={
        <>
          Marketing Built for One Purpose: <br className="hidden md:block" />
          <span className="text-white/60 text-4xl md:text-6xl">Revenue Growth.</span>
        </>
      }
      subtitle="We go beyond aesthetics. We engineer hyper-profitable funnels, deploy aggressive paid campaigns, and systematically scale your company to dominate your market in the US & Canada."
      ctaText="Book a Strategy Call"
      ctaHref="https://calendar.app.google/TJ85TG2Do9uLhC2K7"
      icons={[]}
    />
  );
}
