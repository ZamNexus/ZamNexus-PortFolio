import type { Metadata } from "next";
import { Inter, Sora, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${sora.variable} ${geistMono.variable} h-full antialiased`}
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
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
