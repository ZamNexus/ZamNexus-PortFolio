import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZNXEdu — Campus & Education Management System | ZamNexus",
  description:
    "ZNXEdu connects admissions, automated fee collections, biometric attendance, exams, timetables, and parent mobile apps into one unified campus platform.",
  openGraph: {
    title: "ZNXEdu — Campus & Education Management System | ZamNexus",
    description: "One intelligent operating system for every campus, classroom, and parent.",
    type: "website",
    siteName: "ZamNexus",
  },
};

export default function ZNXEduLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
