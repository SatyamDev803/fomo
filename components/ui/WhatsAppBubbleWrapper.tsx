"use client";

import dynamic from "next/dynamic";

const WhatsAppBubble = dynamic(
  () => import("@/components/ui/WhatsAppBubble"),
  { ssr: false }
);

export function WhatsAppBubbleWrapper() {
  return <WhatsAppBubble />;
}
