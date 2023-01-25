
import { getRandomWords } from "$lib/util/firebase";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const words = await getRandomWords();

  return {
    words: words,
  }
}
