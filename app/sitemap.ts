import { MetadataRoute } from "next";

import { getPosts } from "./components/lib/BlogServiceMany";
import { getCategories } from "./components/lib/BlogServiceMany";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = "https://www.travel-memory-life.com/";
  const _lastModified = new Date();

  const posts = await getPosts();
  const categories = await getCategories();

  const staticPaths = [
    {
      url: `${baseURL}`,
      lastModified: _lastModified,
    },
    {
      url: `${baseURL}/privacypolicy`,
      lastModified: _lastModified,
    },
    {
      url: `${baseURL}/memorybook`,
      lastModified: _lastModified,
    },
  ];

  
  const dynamicPathsPosts = posts.map((post) => {
    return {
      url: `${baseURL}/${post.category.slug}/${post.slug}`,
      lastModified: new Date(post.createdDate),
    };
  });

  const dynamicPathsCategories = categories.map((category) => {
    return {
      url: `${baseURL}/${category.slug}`,
      lastModified: new Date(category.createdDate),
    };
  });

  
  return [...staticPaths, ...dynamicPathsPosts, ...dynamicPathsCategories];
}
