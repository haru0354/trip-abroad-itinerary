import { load } from "cheerio";

type TocItem = {
  id: string;
  text: string;
  tag: string;
};

export const generateTocId = (contents: string): TocItem[] => {
  const $ = load(contents);
  const toc: TocItem[] = [];

  $("h2, h3").each((index, element) => {
    let id = $(element).attr("id");
    const text = $(element).text();
    const tagName = $(element).prop("tagName");
    if (!tagName) return;
    
    const tag = tagName.toLowerCase();

    if (!id) {
      const generatedId = `${index}`;
      $(element).attr("id", generatedId);
      id = generatedId;
    }

    if (id) {
      toc.push({ id, text, tag });
    }
  });

  return toc;
};

export const addGenerateContentId = (contents: string) => {
  const $ = load(contents);

  $("h2, h3").each((index, element) => {
    let id = $(element).attr("id");

    if (!id) {
      const generatedId = `${index}`;
      $(element).attr("id", generatedId);
      id = generatedId;
    }
  });

  return $.html();
};
