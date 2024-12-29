import { MetadataRoute } from "next";
import { getPosts } from "./(blog)/lib/service/blogServiceMany";
import { getCategories } from "./(blog)/lib/service/blogServiceMany";

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
    if (post.category && post.category.slug) {
      return {
        url: `${baseURL}/${post.category.slug}/${post.slug}`,
        lastModified: new Date(post.createdDate),
      };
    }
    return {
      url: `${baseURL}`, 
      lastModified: new Date(),
    };
  }); 
  
  const dynamicPathsCategories = categories.map((category) => {
    if (category.slug) {
      return {
        url: `${baseURL}/${category.slug}`,
        lastModified: new Date(category.createdDate),
      };
    }
    return {
      url: `${baseURL}`, 
      lastModified: new Date(),
    };
  });

  
  return [...staticPaths, ...dynamicPathsPosts, ...dynamicPathsCategories];
}
