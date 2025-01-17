import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/app/(blog)/lib/service/blogServiceMany";

const SideNewArticles = async () => {
  const posts = await getPosts("categoryAndPostImage", 5);

  if (!posts) {
    return null;
  }

  return (
    <div className="w-full p-2">
      <h3 className="px-2 py-4 font-bold text-lg rounded bg-blog-heading text-white">
      新着記事
      </h3>
      <ul>
        {posts.map((post) => {
          return (
            post.draft && (
              <li
                key={post.id}
                className="my-6 p-3 border-b border-gray-600 border-dashed hover:bg-gray-200"
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
                    <p className="text-gray-600 my-2">
                      {post.title.slice(0, 36)}...
                    </p>
                  ) : (
                    <p className="text-gray-600 my-2">{post.title}</p>
                  )}
                </Link>
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
};

export default SideNewArticles;
