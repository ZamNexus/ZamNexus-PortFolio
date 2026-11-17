import type { Metadata } from "next";
import Image from "next/image";
import { authConfig } from "@/lib/auth/guard";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Sign in" };
export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  const configured = authConfig().configured;
  return (
    <div className="adm-login">
      <div className="adm-login__card">
        <Image src="/znx_logo_teal.png" alt="ZamNexus" width={150} height={75} className="adm-login__logo logo-dark" priority />
        <Image src="/znx_logo_teal_light.png" alt="" aria-hidden="true" width={150} height={75} className="adm-login__logo logo-light" priority />
        <h1 className="adm-title" style={{ textAlign: "center", fontSize: "1.5rem" }}>
          Admin sign in
        </h1>
        <p className="adm-sub" style={{ textAlign: "center", marginInline: "auto", marginBottom: 24 }}>
          Manage Insights articles. Only authorised administrators can continue.
        </p>
        {configured ? (
          <LoginForm />
        ) : (
          <div className="adm-alert adm-alert--warn" role="alert">
            The admin panel is not set up on this server yet. Add ADMIN_EMAIL, ADMIN_PASSWORD_HASH and ADMIN_SESSION_SECRET to the
            server&apos;s environment (see docs/cms/README.md), then restart.
          </div>
        )}
      </div>
    </div>
  );
}
