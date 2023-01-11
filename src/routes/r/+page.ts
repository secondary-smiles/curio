import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ url }) => {
  return {
    query: url.searchParams.get('query')
  }
}
