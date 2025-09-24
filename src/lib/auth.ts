export type AuthUser = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  user_type: 'proprietaire' | 'locataire' | 'manager' | null;
};

async function fetchJson<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) {
    // Try to parse structured error
    let payload: any = null;
    try {
      const contentType = res.headers.get('Content-Type') || '';
      if (contentType.includes('application/json')) {
        payload = await res.json();
      } else {
        const txt = await res.text();
        payload = txt ? { detail: txt } : null;
      }
    } catch {
      // ignore
    }

    // Extract server-provided messages if present
    const messages: string[] = [];
    if (payload) {
      if (typeof payload.detail === 'string') messages.push(payload.detail);
      if (Array.isArray(payload.non_field_errors)) {
        for (const m of payload.non_field_errors) if (typeof m === 'string') messages.push(m);
      }
      // Flatten field errors (e.g. {username: ["..."], password:["..."]})
      for (const key of Object.keys(payload)) {
        const val = payload[key];
        if (Array.isArray(val)) {
          for (const m of val) if (typeof m === 'string') messages.push(m);
        }
      }
    }

    // Map technical errors to user-friendly messages
    const status = res.status;
    let userMessage = '';
    const combined = messages.join(' ') || '';

    // Specific known auth messages
    if (/Unable to log in/i.test(combined)) userMessage = "Nom d'utilisateur ou mot de passe incorrect.";
    if (/Account not verified/i.test(combined)) userMessage = 'Compte non vérifié.';
    if (/disabled/i.test(combined)) userMessage = 'Compte désactivé.';

    if (!userMessage) {
      if (status === 400 || status === 401) userMessage = 'Requête invalide ou non autorisée.';
      else if (status === 403) userMessage = 'Accès refusé.';
      else if (status === 404) userMessage = 'Ressource introuvable.';
      else if (status === 415) userMessage = 'Format des données non pris en charge.';
      else if (status === 429) userMessage = 'Trop de requêtes. Réessayez plus tard.';
      else if (status >= 500) userMessage = 'Erreur serveur. Réessayez plus tard.';
      else userMessage = 'Une erreur est survenue. Réessayez.';
    }

    throw new Error(userMessage);
  }
  return res.json() as Promise<T>;
}

export async function getCsrf(): Promise<string> {
  const data = await fetchJson<{ csrfToken: string }>('/api/v1/auth/csrf/');
  return data.csrfToken;
}

export async function me(): Promise<{ authenticated: boolean; user?: AuthUser }>{
  return fetchJson('/api/v1/auth/me/');
}

export async function loginReq(username: string, password: string): Promise<{ ok: boolean; user: AuthUser }>{
  const csrf = await getCsrf();
  return fetchJson('/api/v1/auth/login/', {
    method: 'POST',
    headers: { 'X-CSRFToken': csrf },
    body: JSON.stringify({ username, password }),
  });
}

export async function logoutReq(): Promise<{ ok: boolean }>{
  const csrf = await getCsrf();
  return fetchJson('/api/v1/auth/logout/', {
    method: 'POST',
    headers: { 'X-CSRFToken': csrf },
  });
}

