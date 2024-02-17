import Image from "next/image";

type Post = {
  title: string;
  description: string;
};

type CardProps = {
  post: Post;
};

const Card: React.FC<CardProps> = ({ post }) => {
  return (
    <>
      <div className="flex h-full border border-gray-300 my-8 hover:bg-gray-200">
        <div className="w-[30%] flex items-center justify-center px-4 py-6">
          <Image
            src="/card.JPG"
            alt="削除する"
            width={170}
            height={110}
            objectFit="contain"
          ></Image>
        </div>
        <div className="w-[70%]  px-4 py-6">
          <h3 className="text-lg font-bold text-gray-700 mb-4">{post.title}</h3>
          <p>{post.description.length > 72 ? `${post.description.slice(0, 72)}...` : post.description}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
