import React from 'react';
import { api } from '../../lib/api';

export const BackendStatus: React.FC = () => {
	const [status, setStatus] = React.useState<string>('…');
	React.useEffect(() => {
		const ctl = new AbortController();
		api<{status: string; service: string}>('/api/health', { signal: ctl.signal })
			.then((d) => setStatus(`${d.status} (${d.service})`))
			.catch(() => setStatus('offline'));
		return () => ctl.abort();
	}, []);
	return <span className="text-xs text-slate-400">API: {status}</span>;
};

export default BackendStatus;


