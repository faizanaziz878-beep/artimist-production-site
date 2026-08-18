"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function LoginForm() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus("");
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: String(data.get("username") || ""),
          password: String(data.get("password") || ""),
        }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Sign-in failed.");
      router.replace("/admin");
      router.refresh();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Sign-in failed.");
      setBusy(false);
    }
  }

  return (
    <form className="admin-login-form" onSubmit={submit}>
      <label>
        <span>Username</span>
        <input name="username" autoComplete="username" required autoFocus defaultValue="" />
      </label>
      <label>
        <span>Password</span>
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      <button type="submit" disabled={busy}>
        {busy ? "Checking…" : "Enter the control room"}
      </button>
      {status ? <p className="admin-login-error">{status}</p> : null}
    </form>
  );
}
