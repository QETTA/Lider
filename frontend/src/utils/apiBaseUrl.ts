function sanitizeBaseUrl(url: string) {
  return url.trim().replace(/\/$/, '');
}

function isLocalHostname(hostname: string) {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0';
}

function resolveLocalApiBaseUrl() {
  if (typeof window === 'undefined') {
    return 'http://localhost:3001';
  }

  const hostname = window.location.hostname === '0.0.0.0' ? '127.0.0.1' : window.location.hostname;
  return `${window.location.protocol}//${hostname}:3001`;
}

export function resolveApiBaseUrl() {
  const configuredUrl = import.meta.env.VITE_API_BASE_URL?.trim();

  if (!configuredUrl) {
    return resolveLocalApiBaseUrl();
  }

  if (typeof window === 'undefined') {
    return sanitizeBaseUrl(configuredUrl);
  }

  if (isLocalHostname(window.location.hostname)) {
    try {
      const configuredHostname = new URL(configuredUrl).hostname;
      if (!isLocalHostname(configuredHostname)) {
        return resolveLocalApiBaseUrl();
      }
    } catch {
      return resolveLocalApiBaseUrl();
    }
  }

  return sanitizeBaseUrl(configuredUrl);
}

export function resolveSameOriginAwareApiBaseUrl() {
  const configuredUrl = import.meta.env.VITE_API_BASE_URL?.trim();
  if (configuredUrl) {
    return resolveApiBaseUrl();
  }

  if (typeof window === 'undefined') {
    return 'http://localhost:3001';
  }

  if (isLocalHostname(window.location.hostname)) {
    return resolveLocalApiBaseUrl();
  }

  return window.location.origin;
}
