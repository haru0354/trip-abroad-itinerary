import { MetadataRoute } from "next";
import { getPosts } from "./(blog)/lib/service/blogServiceMany";
import { getCategories } from "./(blog)/lib/service/blogServiceMany";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteURL = process.env.NEXT_PUBLIC_URL;
  const _lastModified = new Date();

  const posts = await getPosts();
  const categories = await getCategories();

  const staticPaths = [
    {
      url: `${siteURL}`,
      lastModified: _lastModified,
    },
    {
      url: `${siteURL}/privacypolicy`,
      lastModified: _lastModified,
    },
    {
      url: `${siteURL}/memorybook`,
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
