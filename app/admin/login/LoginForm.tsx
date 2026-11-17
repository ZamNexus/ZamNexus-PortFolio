"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ApiError, api } from "@/components/admin/api";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await api("/api/admin/login", { method: "POST", body: { email, password } });
      router.replace("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Try again.");
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate style={{ display: "grid", gap: 16 }}>
      <div className="adm-field">
        <label className="adm-label" htmlFor="admin-email">Email</label>
        <input id="admin-email" className="adm-input" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!error} />
      </div>
      <div className="adm-field">
        <label className="adm-label" htmlFor="admin-password">Password</label>
        <input id="admin-password" className="adm-input" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} aria-invalid={!!error} />
      </div>
      {error ? (
        <p className="adm-error" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" className="adm-btn adm-btn--primary adm-btn--block" disabled={busy || !email || !password}>
        {busy ? <span className="adm-spin" aria-hidden="true" /> : null}
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
