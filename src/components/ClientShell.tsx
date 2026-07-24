"use client";

/**
 * ClientShell — Client Component wrapper for the layout.
 * `ssr: false` with next/dynamic requires a Client Component boundary.
 * Wraps the page shell (SmoothScroll, Chatbot, ExitIntentPopup) so layout.tsx stays a Server Component.
 */
import dynamic from "next/dynamic";

const SmoothScroll = dynamic(
  () => import("@/components/SmoothScroll"),
  { ssr: false }
);

const Chatbot = dynamic(
  () => import("@/components/Chatbot/Chatbot"),
  { ssr: false }
);

const ExitIntentPopup = dynamic(
  () => import("@/components/ExitIntentPopup"),
  { ssr: false }
);

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll>
        {children}
      </SmoothScroll>
      <Chatbot />
      <ExitIntentPopup />
    </>
  );
}
