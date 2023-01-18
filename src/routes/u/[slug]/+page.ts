import { ColorHash } from "$lib/util/color";
import { getUserWords } from "$lib/util/firebase";
import type { Word } from "$lib/util/word";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  let queryWord = params.slug.trim()

  let data: Word[];
  try {
    data = await getUserWords(queryWord, 3);
  } catch (err) {
    console.error(err);
    throw error(404, queryWord);
  }

  let hex = new ColorHash().hex(queryWord);

  return {
    slug: params.slug,
    words: data,
    hex: hex,
  }
}
