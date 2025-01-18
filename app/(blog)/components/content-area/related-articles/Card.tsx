import Image from "next/image";

type Post = {
  title: string;
  description: string;
  draft: boolean;
  postImage?: {
    url: string;
    altText: string;
  } | null;
};

type CardProps = {
  post: Post;
};

const Card: React.FC<CardProps> = ({ post }) => {
  return (
    <>
      {post.draft && (
        <div className="flex flex-wrap md:flex-nowrap w-full my-2 border border-blog-borderBlack transition duration-300 hover:bg-blog-hoverBlue">
          {post.postImage ? (
            <div className="w-full min-w-[300px] md:w-auto pt-3 md:pt-0">
              <Image
                src={post.postImage.url}
                alt={post.postImage.altText}
                width={300}
                height={200}
                style={{
                  width: "300",
                  height: "auto",
                }}
                className="block mx-auto"
              />
            </div>
          ) : (
            <div className="w-full min-w-[300px] md:w-auto pt-3 md:pt-0">
              <Image
                src="/no_image.jpg"
                alt="画像の準備中"
                width={300}
                height={200}
                style={{
                  width: "300",
                  height: "auto",
                }}
                className="block mx-auto"
              />
            </div>
          )}
          <div className="w-full md:flex-auto px-4 py-3 card">
            {post.title && post.title.length > 31 ? (
              <h3 className="mb-4 text-lg font-bold text-blog-black">
                {post.title.slice(0, 31)}...
              </h3>
            ) : (
              <h3 className="mb-4 text-lg font-bold text-blog-black">
                {post.title}
              </h3>
            )}
            <p className="text-blog-black mb-0">
              {post.description.length > 72
                ? `${post.description.slice(0, 72)}...`
                : post.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
