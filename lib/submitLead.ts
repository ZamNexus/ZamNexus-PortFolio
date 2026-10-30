// Browser-side helper for the site's forms. Posts to /api/lead and returns an error message, or null on success.
export async function submitLead(payload: Record<string, unknown>): Promise<string | null> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) return null;
    const data: { error?: string } = await res.json().catch(() => ({}));
    return data.error ?? "Something went wrong. Please email contact@zamnexus.com.";
  } catch {
    return "Network error. Please check your connection or email contact@zamnexus.com.";
  }
}
