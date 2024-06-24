import { load } from "cheerio";

type TocItem = {
  id: string;
  text: string;
};

export const GenerateTocId = (contents: string): TocItem[] => {
  const $ = load(contents);
  const toc: TocItem[] = [];

  $("h2, h3, h4").each((index, element) => {
    let id = $(element).attr("id");
    const text = $(element).text();

    if (!id) {
      const generatedId = `${index}`;
      $(element).attr("id", generatedId);
      id = generatedId;
    }

    if (id) {
      toc.push({ id, text });
    }
  });

  return toc;
};

export const AddGenerateContentId = (contents: string) => {
  const $ = load(contents);

  $("h2, h3, h4").each((index, element) => {
    let id = $(element).attr("id");

    if (!id) {
      const generatedId = `${index}`;
      $(element).attr("id", generatedId);
      id = generatedId;
    }
  });

  return $.html();
};


