import { decodeToken } from '$lib/utilities/jwt';
import * as cookie from 'cookie';

export async function handle({ event, resolve }) {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '');
  console.log(`cookies from handle func ${JSON.stringify(cookies)}`);
  const jwt = cookies.jwt && decodeToken(cookies.jwt);
  event.locals.user = jwt ? JSON.parse(jwt) : null;
  return await resolve(event, {ssr: false});
}

export function getSession(event) {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '');
  console.log(`cookies from getSession func ${JSON.stringify(cookies)}`);
  const jwt = cookies.jwt && decodeToken(cookies.jwt);
  event.locals.user = jwt ? JSON.parse(jwt) : null;

  console.log(`event ${JSON.stringify(event)}`);
  return {
    user: event.locals.user && {
      id: +event.locals.user.id,
      email: event.locals.user.email,
    },
  };
}
