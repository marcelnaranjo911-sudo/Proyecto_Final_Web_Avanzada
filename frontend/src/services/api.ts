const API_BASE = '/api';

function buildHeaders(token?: string) {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
}

async function request(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('auth_token');
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: buildHeaders(token ?? undefined)
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = body?.message || response.statusText || 'Error en la solicitud';
    throw new Error(message);
  }

  if (response.status === 204) {
    return { data: null };
  }

  return response.json();
}

export const api = {
  get: async (path: string) => request(path, { method: 'GET' }),
  post: async (path: string, body: unknown) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: async (path: string, body: unknown) => request(path, { method: 'PUT', body: JSON.stringify(body) }),
  patch: async (path: string, body: unknown) => request(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: async (path: string) => request(path, { method: 'DELETE' })
};
