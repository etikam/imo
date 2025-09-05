export async function api<T>(path: string, init?: RequestInit): Promise<T> {
	const res = await fetch(path, {
		headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
		credentials: 'same-origin',
		...init,
	});
	if (!res.ok) {
		let detail = '';
		try {
			detail = await res.text();
		} catch {}
		throw new Error(`API ${res.status}: ${detail || res.statusText}`);
	}
	return res.json() as Promise<T>;
}



