import Image from "next/image";
import { PostWithPostImage } from "@/app/(blog)/types/postTypes";

type CardProps = {
  post: PostWithPostImage;
};

const Card: React.FC<CardProps> = ({ post }) => {
  if (!post.draft) return null;

  return (
    <div className="flex flex-col md:flex-row items-start justify-center w-full my-4  shadow-sm hover:shadow-md hover:rounded-lg border border-gray-200 bg-white hover:scale-105 transition">
      <div className="w-full max-w-[280px] mx-auto ">
        <Image
          src={post.postImage?.url || "/no_image.jpg"}
          alt={post.postImage?.altText || "画像の準備中"}
          width={280}
          height={180}
        />
      </div>

      <div className="w-full p-4 flex flex-col justify-between card">
        <h3 className="mb-2 text-lg font-bold text-blog-black">
          {post.title.length > 31
            ? `${post.title.slice(0, 31)}...`
            : post.title}
        </h3>
        <p className="text-blog-black mb-0">
          {post.description.length > 72
            ? `${post.description.slice(0, 72)}...`
            : post.description}
        </p>
      </div>
    </div>
  );
};

export default Card;
