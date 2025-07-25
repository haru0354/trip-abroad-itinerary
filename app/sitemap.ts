import { MetadataRoute } from "next";

import { getPosts } from "./(blog)/lib/service/blogServiceMany";
import { getCategories } from "./(blog)/lib/service/blogServiceMany";
import { siteURL } from "./(blog)/config/blogConfig";

export const revalidate = 60 * 60 * 24 * 15;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const _lastModified = new Date();

  const posts = await getPosts("categoryAndPostImage");
  const categories = await getCategories();

  const staticPaths = [
    {
      url: `${siteURL}`,
      lastModified: _lastModified,
    },
    {
      url: `${siteURL}/blog`,
      lastModified: _lastModified,
    },
    {
      url: `${siteURL}/sitemaps`,
      lastModified: _lastModified,
    },
    {
      url: `${siteURL}/privacypolicy`,
      lastModified: _lastModified,
    },
  ];

  const dynamicPathsPosts = posts.map((post) => {
    if (post.category && post.category.slug) {
      return {
        url: `${siteURL}/${post.category.slug}/${post.slug}`,
        lastModified: new Date(post.createdDate),
      };
    }
    return {
      url: `${siteURL}`,
      lastModified: new Date(),
    };
  });

  const dynamicPathsCategories = categories.map((category) => {
    if (category.slug) {
      return {
        url: `${siteURL}/${category.slug}`,
        lastModified: new Date(category.createdDate),
      };
    }
    return {
      url: `${siteURL}`,
      lastModified: new Date(),
    };
  });

  return [...staticPaths, ...dynamicPathsPosts, ...dynamicPathsCategories];
}
