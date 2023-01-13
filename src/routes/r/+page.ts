import { error } from '@sveltejs/kit';

import type { PageLoad } from "./$types";
import type { Word } from "$lib/util/word";

import { searchWord } from "$lib/util/firebase";

export const load: PageLoad = async ({ url }) => {
  let query = url.searchParams.get('query');
  if (!query) throw error(400, "query param is required");

  query = query.trim().toLowerCase();

  const words: Word[] = await searchWord(query);

  return {
    query: url.searchParams.get('query'),
    words: words,
  }
}
