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
    let detail = '';
    try { detail = await res.text(); } catch {}
    throw new Error(`API ${res.status}: ${detail || res.statusText}`);
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

