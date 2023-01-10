import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, url }) => {
  console.log(params)
  return {
    slug: params.slug,
  }
}
