import { prisma } from '$lib/utilities/database';
import { respond } from './_respond';

export const post = async ({ request }) => {
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
    password = rawBodyText.get('password');
  }

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      headers: { Location: `/echo-chamber/sign-in?error=No+such+user+exists` },
      status: 303,
    };
  }

  if (user.password !== password) {
    return {
      headers: { Location: `/echo-chamber/sign-in?error=Incorrect+password` },
      status: 303,
    };
  }
  console.log('coming here!!');
  return respond({ user });
};
