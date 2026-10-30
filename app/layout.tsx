import type { Metadata } from "next";
import { Schibsted_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";
import { pageMetadata, SITE_URL } from "@/lib/seo";

// One family for headings and body; Geist Mono only for real codes and data.
const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Homepage metadata; every other route sets its own title, description and canonical in its layout.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...pageMetadata({
    title: "ZamNexus | ERP, POS, EHR & Enterprise Software Engineering",
    description:
      "Four ready-to-deploy business platforms, plus the engineers to build what you need next: AI, cloud, SaaS, Microsoft and Salesforce. Book a consultation.",
    path: "/",
  }),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${schibsted.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/*
          Synchronously intercepts and blocks browser extension attributes
          (Bitdefender's `bis_skin_checked`, Grammarly, etc.) BEFORE React hydrates,
          preventing the "A tree hydrated but some attributes didn't match" error.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Catch and suppress unhandled promise rejections (extensions, clipboard permissions, aborts)
                  // so that Next.js development overlay does not crash the page
                  window.addEventListener('unhandledrejection', function(event) {
                    try {
                      if (event && typeof event.preventDefault === 'function') {
                        event.preventDefault();
                      }
                      if (event && event.reason) {
                        console.warn('[Handled Promise Rejection Intercepted]', event.reason);
                      }
                    } catch(_) {}
                  }, true);

                  var blocked = ['bis_skin_checked', 'bis_register', 'data-new-gr-c-s-check-loaded', 'data-gr-ext-installed'];
                  var origSet = Element.prototype.setAttribute;
                  Element.prototype.setAttribute = function(name, val) {
                    if (blocked.indexOf(name) !== -1 || (typeof name === 'string' && name.indexOf('data-gr-') === 0)) return;
                    return origSet.apply(this, arguments);
                  };
                  var origSetNode = Element.prototype.setAttributeNode;
                  if (origSetNode) {
                    Element.prototype.setAttributeNode = function(attr) {
                      if (attr && (blocked.indexOf(attr.name) !== -1 || (typeof attr.name === 'string' && attr.name.indexOf('data-gr-') === 0))) return null;
                      return origSetNode.apply(this, arguments);
                    };
                  }
                  blocked.forEach(function(b) {
                    try {
                      Object.defineProperty(Element.prototype, b, {
                        get: function() { return undefined; },
                        set: function() {},
                        configurable: true
                      });
                    } catch(e) {}
                  });
                  var observer = new MutationObserver(function(mutations) {
                    for (var i = 0; i < mutations.length; i++) {
                      var m = mutations[i];
                      if (m.type === 'attributes' && (blocked.indexOf(m.attributeName) !== -1 || (typeof m.attributeName === 'string' && m.attributeName.indexOf('data-gr-') === 0))) {
                        m.target.removeAttribute(m.attributeName);
                      }
                    }
                  });
                  observer.observe(document.documentElement, {
                    attributes: true,
                    subtree: true
                  });
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://zamnexus.com/#organization",
                  name: "ZamNexus",
                  alternateName: "Zamooq Limited",
                  url: "https://zamnexus.com",
                  logo: "https://zamnexus.com/znx_logo_clean.png",
                  foundingDate: "2009",
                  founder: {
                    "@type": "Person",
                    name: "Mir Mujeeb Ul Hassan",
                  },
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "sales",
                    email: "contact@zamnexus.com",
                    telephone: "+44 7859 043361",
                    areaServed: ["GB", "PK", "AE"],
                  },
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "34 Beaconsfield",
                    addressLocality: "Luton",
                    postalCode: "LU2 0RW",
                    addressCountry: "GB",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://zamnexus.com/#website",
                  url: "https://zamnexus.com",
                  name: "ZamNexus",
                  publisher: {
                    "@id": "https://zamnexus.com/#organization",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
