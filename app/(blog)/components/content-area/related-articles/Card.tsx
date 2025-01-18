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
        <div className="flex flex-wrap md:flex-nowrap  w-full my-8 border border-gray-400 transition duration-300 hover:bg-gray-100">
          {post.postImage ? (
            <div className="w-full md:w-auto pt-3 md:pt-0 min-w-[300px]">
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
            <div className="w-full md:w-auto pt-3 md:pt-0 min-w-[300px]">
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
              <h3 className="text-lg font-bold  mb-4">
                {post.title.slice(0, 31)}...
              </h3>
            ) : (
              <h3 className="text-lg font-bold text-blog-black mb-4 border-none ">
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
