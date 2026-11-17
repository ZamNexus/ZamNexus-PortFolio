import type { Metadata } from "next";
import "./admin.css";

// Everything under /admin is private: never indexed, never cached.
export const metadata: Metadata = {
  title: { default: "Admin | ZamNexus", template: "%s | ZamNexus Admin" },
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="adm">{children}</div>;
}
