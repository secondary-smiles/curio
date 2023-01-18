import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ url }) => {
  let fill = url.searchParams.get('fill');
  fill = fill ? fill.trim() : ""
  fill = fill.split(" ").join("-");

  return {
    fill: fill
  }
}
