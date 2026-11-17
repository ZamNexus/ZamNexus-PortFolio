import AdminShell from "@/components/admin/AdminShell";
import { requireAdminPage } from "@/lib/auth/guard";

export const dynamic = "force-dynamic";

// Every page in the panel runs this check on the server, on every request, whatever the proxy did first.
export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdminPage();
  return <AdminShell email={session.sub}>{children}</AdminShell>;
}
