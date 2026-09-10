import type { Metadata } from "next";
import { Inter, Sora, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZamNexus — Connecting Intelligence. Enabling Action.",
  description:
    "ZamNexus, a technology brand of Zamooq Limited. We design and deliver intelligent solutions powered by AI, cloud-native engineering, SaaS, automation, Microsoft Dynamics 365, Power Platform and Salesforce.",
  openGraph: {
    title: "ZamNexus — Connecting Intelligence. Enabling Action.",
    description:
      "Intelligent technology solutions: AI, SaaS, cloud-native engineering, automation and connected business platforms.",
    type: "website",
    siteName: "ZamNexus",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${sora.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {/*
          Strips attributes injected by common browser extensions
          (Bitdefender's `bis_skin_checked`, Grammarly, LastPass, etc.) before
          React hydrates, so hydration doesn't fail on the added attribute.
          `strategy="beforeInteractive"` guarantees this runs before hydration.
        */}
        <Script id="strip-extension-attrs" strategy="beforeInteractive">
          {`
            try {
              var stripAttrs = ['bis_skin_checked', 'bis_register', 'data-new-gr-c-s-check-loaded', 'data-gr-ext-installed'];
              var observer = new MutationObserver(function(mutations) {
                for (var i = 0; i < mutations.length; i++) {
                  var m = mutations[i];
                  if (m.type === 'attributes' && stripAttrs.indexOf(m.attributeName) !== -1) {
                    m.target.removeAttribute(m.attributeName);
                  }
                }
              });
              observer.observe(document.documentElement, {
                attributes: true,
                subtree: true,
                attributeFilter: stripAttrs
              });
            } catch (e) {}
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
