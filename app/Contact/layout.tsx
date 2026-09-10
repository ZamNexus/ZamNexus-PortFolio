import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact ZamNexus | Start a Conversation",
  description:
    "Get in touch with the ZamNexus team. Tell us about your challenge, your idea or your ambition. Our senior architects review and respond within one business day.",
  openGraph: {
    title: "Contact ZamNexus",
    description:
      "Start a conversation with ZamNexus. AI, SaaS, cloud and enterprise technology solutions tailored to your business.",
    type: "website",
    siteName: "ZamNexus",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
