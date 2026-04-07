const BASE_KEY = "savedProperties";

function safeJsonParse(raw: string | null): any[] {
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function decodeTokenPayload(token: string): Record<string, any> | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) {
      return null;
    }

    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const pad = base64.length % 4;
    const normalized = pad ? base64 + "=".repeat(4 - pad) : base64;
    const payload = atob(normalized);
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

function getCurrentUserIdFromToken(): string | null {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  const payload = decodeTokenPayload(token);
  const uid = payload?.user_id || payload?.sub || null;

  return typeof uid === "string" && uid.trim() ? uid : null;
}

export function getSavedPropertiesStorageKey(): string {
  const uid = getCurrentUserIdFromToken();
  return uid ? `${BASE_KEY}:${uid}` : `${BASE_KEY}:anonymous`;
}

export function getSavedProperties(): any[] {
  const scopedKey = getSavedPropertiesStorageKey();
  const scopedSaved = safeJsonParse(localStorage.getItem(scopedKey));

  if (scopedSaved.length > 0) {
    return scopedSaved;
  }

  // One-time migration from old global key to current scoped user key.
  const legacySaved = safeJsonParse(localStorage.getItem(BASE_KEY));
  if (legacySaved.length > 0) {
    localStorage.setItem(scopedKey, JSON.stringify(legacySaved));
    localStorage.removeItem(BASE_KEY);
    return legacySaved;
  }

  return scopedSaved;
}

export function setSavedProperties(items: any[]): void {
  localStorage.setItem(getSavedPropertiesStorageKey(), JSON.stringify(items));
}
