import { useEffect, useState } from 'react';

interface VersionResponse {
  version: string;
  description?: string;
}

export const useVersion = () => {
  const [version, setVersion] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        // Ensure we respect the deployed base path (e.g. /<repo-name>/ on GitHub Pages)
  // Vite exposes import.meta.env.BASE_URL; we also allow fallback to a runtime var VITE_BASE if provided.
  interface EnvLike { BASE_URL?: string; VITE_BASE?: string }
  const env: EnvLike = (import.meta as unknown as { env?: EnvLike }).env || {};
  const base = env.BASE_URL || env.VITE_BASE || '/';
        // version file is generated at build time to public/api/version.json
        const url = `${base.replace(/\/$/,'')}/api/version`;
        const response = await fetch(url, { method: 'GET', cache: 'no-cache' });
        if (!response.ok) throw new Error(`Failed to fetch version: ${response.status}`);
        const data: VersionResponse = await response.json();
        setVersion(data.version);
      } catch (err) {
        console.error('Version fetch failed', err);
        setError('Could not load version info');
      } finally {
        setLoading(false);
      }
    };
    fetchVersion();
  }, []);

  return { version, loading, error };
};
