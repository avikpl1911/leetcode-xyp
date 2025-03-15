export function parseCookie(cookieString?: string): Record<string, string> {
  if (!cookieString) {
    return {};
  }

  return cookieString.split(';').reduce((cookies: Record<string, string>, cookiePair) => {
    const [name, value] = cookiePair.trim().split('=');
    if (name && value) {
      cookies[decodeURIComponent(name.trim())] = decodeURIComponent(value.trim());
    }
    return cookies;
  }, {}); // Initial value is still {}, but now the reduce function knows the type.
}

      