import { MiddlewareHandler } from 'hono';

export const cookieMaxAgeMiddleware: MiddlewareHandler = async (c, next) => {
  await next();
  
  const cookieHeader = c.res.headers.get('Set-Cookie');
  if (cookieHeader) {
    const updatedCookie = cookieHeader.replace(
      /Max-Age=\d+/,
      'Max-Age=34560000'
    );
    c.res.headers.set('Set-Cookie', updatedCookie);
  }
};
