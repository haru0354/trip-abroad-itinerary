import {
  getPosts,
  getCategories,
} from "@/app/(blog)/lib/service/blogServiceMany";
import { siteURL } from "@/app/(blog)/config/blogConfig";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await getPosts("categoryAndPostImage");
  const categories = await getCategories();

  const urls = [
    `${siteURL}`,
    `${siteURL}/privacypolicy`,
    `${siteURL}/memorybook`,
    ...posts.map(
      (post) => `${siteURL}/${post.category?.slug ?? "unknown"}/${post.slug}`
    ),
    ...categories.map((category) => `${siteURL}/${category.slug}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
    <url>
      <loc>${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
