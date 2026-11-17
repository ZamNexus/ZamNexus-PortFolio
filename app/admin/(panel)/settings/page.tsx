import type { Metadata } from "next";
import { authConfig, getAdminSession } from "@/lib/auth/guard";
import { storageStatus } from "@/lib/cms/store";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const [session, storage] = await Promise.all([getAdminSession(), storageStatus()]);
  const cfg = authConfig();
  const expires = session ? new Date(session.exp * 1000).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }) : "";
  const row = (label: string, value: React.ReactNode) => (
    <div className="adm-list__row">
      <span>{label}</span>
      <b style={{ color: "var(--foreground-strong)", textAlign: "right", overflowWrap: "anywhere" }}>{value}</b>
    </div>
  );

  return (
    <>
      <div className="adm-head">
        <div>
          <h1 className="adm-title">Settings</h1>
          <p className="adm-sub">How the admin panel is configured on this server. Nothing secret is shown here.</p>
        </div>
      </div>

      {!storage.writable ? (
        <div className="adm-alert adm-alert--warn" role="alert" style={{ marginBottom: 18 }}>
          Content storage is not writable on this server, so articles cannot be saved or published here. Run the site where the data folder is writable,
          or connect a database (see docs/cms/README.md).
        </div>
      ) : null}

      <div className="adm-two">
        <section className="adm-card" aria-labelledby="acct-title">
          <h2 id="acct-title" className="adm-card__title">Account</h2>
          <div className="adm-list">
            {row("Signed in as", session?.sub)}
            {row("Role", session?.role)}
            {row("Session ends", expires)}
            {row("Sign-in configured", cfg.configured ? "Yes" : "No")}
          </div>
          <p className="adm-hint" style={{ marginTop: 14 }}>
            There is one administrator account, set in the server&apos;s environment. There is no public sign-up. To change the password, generate a new hash with
            <code> node scripts/hash-password.mjs</code>.
          </p>
        </section>

        <section className="adm-card" aria-labelledby="store-title">
          <h2 id="store-title" className="adm-card__title">Content storage</h2>
          <div className="adm-list">
            {row("Driver", storage.driver)}
            {row("Location", storage.location)}
            {row("Saved", storage.persisted ? "Yes" : "Not yet (the first save stores the original articles)")}
            {row("Writable", storage.writable ? "Yes" : "No")}
            {row("Images", process.env.BLOB_READ_WRITE_TOKEN ? "Vercel Blob" : "Server disk (data/uploads)")}
          </div>
          {storage.driver !== "Postgres" ? (
            <p className="adm-hint" style={{ marginTop: 14 }}>
              On a host without a durable disk, such as Vercel, connect a Postgres database (DATABASE_URL) and Vercel Blob
              (BLOB_READ_WRITE_TOKEN) so articles and images are kept. See docs/cms/README.md.
            </p>
          ) : null}
        </section>
      </div>
    </>
  );
}
