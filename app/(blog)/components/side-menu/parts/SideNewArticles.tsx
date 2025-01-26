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
                className="my-6 p-3 border-b border-blog-borderBlack border-dashed hover:bg-blog-hoverBlue transition duration-300"
              >
                <Link href={`/${post.category.slug}/${post.slug}`}>
                  {post.postImage &&
                    post.postImage.url &&
                    post.postImage.altText && (
                      <Image
                        src={post.postImage.url}
                        alt={post.postImage.altText}
                        width={240}
                        height={160}
                        style={{
                          width: "240px",
                          height: "auto",
                          aspectRatio: "240 / 160",
                        }}
                        className="block mx-auto max-h-[160px]"
                      />
                    )}
                  {post.title && post.title.length > 36 ? (
                    <p className="my-2">{post.title.slice(0, 36)}...</p>
                  ) : (
                    <p className="my-2">{post.title}</p>
                  )}
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
