import Link from "next/link";
import Image from "next/image";

import { getPosts } from "@/app/(blog)/lib/service/blogServiceMany";
import SideMenuContainer from "./SideMenuContainer";

const SideNewArticles = async () => {
  const posts = await getPosts("categoryAndPostImage", 5);

  if (!posts) {
    return null;
  }

  return (
    <SideMenuContainer title="新着記事">
      <ul>
        {posts.map((post) => {
          return (
            post.draft && (
              <li
                key={post.id}
                className="border-b border-blog-borderBlack border-dashed hover:bg-blog-hoverBlue transition duration-300"
              >
                <Link
                  href={`/${post.category.slug}/${post.slug}`}
                  className="block px-2 py-4"
                >
                  {post.postImage &&
                    post.postImage.url &&
                    post.postImage.altText && (
                      <Image
                        src={post.postImage.url}
                        alt={post.postImage.altText}
                        width={270}
                        height={176}
                        className="block mx-auto mb-4"
                      />
                    )}
                  <span className="w-full mb-0">
                    {post.title.length > 36
                      ? `${post.title.slice(0, 36)}...`
                      : post.title}
                  </span>
                </Link>
              </li>
            )
          );
        })}
      </ul>
    </SideMenuContainer>
  );
};

export default SideNewArticles;
