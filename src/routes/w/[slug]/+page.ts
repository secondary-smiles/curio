import { error } from '@sveltejs/kit';

import { getWord } from "$lib/util/firebase";

import type { PageLoad } from "./$types";
import type { Word } from "$lib/util/word";

export const load: PageLoad = async ({ params }) => {
  console.log("loaded")
  let queryWord = params.slug.trim().toLowerCase();

  const words: Word[] = await getWord(queryWord).catch(err => {
    throw error(404, err.message);
  });

  return {
    slug: params.slug,
    words: words,
  }
}
