import type { PageLoad } from "./$types";

import { getLatestWords } from "$lib/util/firebase";

export const load: PageLoad = async ({ params }) => {
  const words = await getLatestWords();

  return {
    words: words,
  }
}
