# Intégration Front (Vite/React) ↔ Backend (Django/DRF)

Ce document explique comment le front appelle l'API Django et comment lancer les services en local. Il couvre aussi un client HTTP minimal réutilisable, la gestion d'erreurs et la configuration pour la production.

---

## 1) Démarrer les services en local (Windows/PowerShell)

### Backend (Django)
Dans le dossier du projet (où se trouve `backend/`):

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install django djangorestframework django-cors-headers
cd backend
python manage.py migrate
python manage.py runserver 8000
```

Endpoints disponibles (dev):
- GET `http://127.0.0.1:8000/api/health` → { status: "ok", service: "backend" }
- GET `http://127.0.0.1:8000/api/demo` → message + liste de features

Fichiers clés:
- `backend/backend/urls.py` → inclut `path('api/', include('api.urls'))`
- `backend/api/urls.py` → routes `health/` et `demo/`
- `backend/api/views.py` → vues DRF
- `backend/backend/settings.py` → `CORS_ALLOW_ALL_ORIGINS = True` (dev), apps `rest_framework`, `corsheaders`, `api`

### Frontend (Vite/React)
Dans le dossier racine du projet:

```powershell
npm run dev
```

Proxy Vite (déjà configuré dans `vite.config.ts`):
```ts
server: {
  proxy: {
    '/api': { target: 'http://127.0.0.1:8000', changeOrigin: true }
  }
}
```
→ Depuis le front, on appelle toujours des chemins relatifs comme `/api/...`; Vite redirige vers Django.

---

## 2) Appeler l’API depuis le front

### Client HTTP minimal (recommandé)
Créez `src/lib/api.ts`:
```ts
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    credentials: 'same-origin',
    ...init,
  });
  if (!res.ok) {
    let detail = '';
    try { detail = await res.text(); } catch {}
    throw new Error(`API ${res.status}: ${detail || res.statusText}`);
  }
  return res.json() as Promise<T>;
}
```

### Exemples d’usage
```ts
// Santé du backend
const health = await api<{status: string; service: string}>('/api/health');

// Démo
const demo = await api<{message: string; features: string[]}>('/api/demo');

// POST avec abort
const ctl = new AbortController();
try {
  const data = await api<{ok: boolean}>(
    '/api/items/',
    { method: 'POST', body: JSON.stringify({ name: 'X' }), signal: ctl.signal }
  );
} finally {
  ctl.abort();
}
```

### Exemple dans un composant React
```tsx
import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export function BackendStatus() {
  const [status, setStatus] = useState('…');
  useEffect(() => {
    const ctl = new AbortController();
    api<{status: string; service: string}>('/api/health', { signal: ctl.signal })
      .then(d => setStatus(`${d.status} (${d.service})`))
      .catch(() => setStatus('offline'));
    return () => ctl.abort();
  }, []);
  return <span>{status}</span>;
}
```

---

## 3) Ajout d’un nouvel endpoint côté backend
1. `backend/api/views.py`:
```py
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def create_item(request):
    return Response({'ok': True})
```
2. `backend/api/urls.py`:
```py
from django.urls import path
from . import views

urlpatterns = [
    path('items/', views.create_item),
]
```
3. Front:
```ts
await api('/api/items/', { method: 'POST', body: JSON.stringify({...}) });
```

---

## 4) CORS, auth et sécurité
- CORS (dev): `CORS_ALLOW_ALL_ORIGINS = True`. En prod, préférez une whitelist:
  ```py
  CORS_ALLOWED_ORIGINS = [
      'https://app.exemple.com',
  ]
  ```
- Auth: selon besoin
  - JWT/Token → `Authorization: Bearer <token>` dans les headers
  - Sessions/CSRF → même domaine, envoyer `X-CSRFToken`
- Toujours valider et filtrer les inputs côté backend (DRF serializers).

---

## 5) Environnements (dev → prod)
- En dev, utilisez le proxy Vite (chemins `/api/...`).
- En prod, deux options:
  1) Reverse-proxy (Nginx) qui expose le backend derrière `/api` sur le même domaine du front → le code front ne change pas.
  2) Variable d’environnement pour une base API:
     ```ts
     const BASE = import.meta.env.VITE_API_BASE ?? '';
     api(`${BASE}/api/health`);
     ```

---

## 6) Dépannage rapide
- 404 sur `/api/...` → vérifier que `backend/api/urls.py` est inclus dans `backend/backend/urls.py`.
- CORS bloqué → vérifier `django-cors-headers` et les réglages CORS.
- Erreur réseau côté front mais `/api` fonctionne en cURL → vérifier le proxy Vite et que Vite tourne bien sur `npm run dev`.

---

## 7) Checklist
- [ ] Backend lancé sur 8000
- [ ] Front lancé (Vite) avec proxy actif
- [ ] `GET /api/health` retourne `{"status":"ok"}`
- [ ] Client `src/lib/api.ts` ajouté et réutilisé
- [ ] (Prod) reverse-proxy ou `VITE_API_BASE` configuré

