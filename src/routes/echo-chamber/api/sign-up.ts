import { prisma } from '$lib/utilities/database';
// import type { ServerRequest } from '@sveltejs/kit/types/hooks';

export const post = async ({ request }) => {
  let user;
  let email: string;
  let password: string;
  const rawBodyText = await request.formData();
  if (typeof rawBodyText === 'string') {
    email = JSON.parse(rawBodyText).email;
    password = JSON.parse(rawBodyText).password;
  } else if (rawBodyText instanceof Uint8Array) {
    email = JSON.parse(rawBodyText.toString()).email;
    password = JSON.parse(rawBodyText.toString()).password;
  } else {
    email = rawBodyText.get('email');
    password =rawBodyText.get('password');
  }

  try {
    user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
  } catch (error) {
    return {
      headers: { Location: `/echo-chamber/sign-up?error=A+user+already+exists+with+that+email.` },
      status: 303,
    };
  }

  if (!user) {
    return {
      headers: { Location: `/echo-chamber/sign-up?error=No+such+user+exists.` },
      status: 303,
    };
  }

  return {
    status: 302,
    headers: {
      Location: '/echo-chamber',
    },
    body: {
      user: {
        id: user.id,
        email: user.email,
      },
    },
  };
};
