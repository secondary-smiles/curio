import sanitizeHtml from "sanitize-html";

function sanitize(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

function parse(data: string) {
  data = sanitize(data);

  data = parseItalics(data);
  data = parseLinks(data);

  return data;
}

function parseItalics(data: string) {
  let blocks = data.split("*");

  for (let i = 1; i < blocks.length; i += 2) {
    blocks[i] = "<i>" + blocks[i] + "</i>"
  }

  return blocks.join(" ");
}

function parseLinks(data: string) {
  // match double square brackets
  const regex = new RegExp(/(\[\[(?:\[??[^\[]*?\]\]))/gm);

  let links = data.match(regex);

  if (links) {
    for (let i = 0; i < links.length; i++) {
      const section = links[i].split("[").join("").split("]").join("");

      const link = `<a href="/w/${section}">${section}</a>`;
      data = data.replace(links[i], link);
    }
  }
  return data;
}

export { parse, sanitize }