import type { RequestHandler } from '@sveltejs/kit';
import data from './pokemon.json';

export const get: RequestHandler = async (event) => {
  // const { query } = request;
  const name = event.url.searchParams.get('name')?.toLowerCase();
  console.log(`name ${name}`);
  let pokemon = data.filter((p) => p.name?.toLowerCase()?.startsWith(name));

  return {
    body: {
      pokemon,
    },
  };
};
