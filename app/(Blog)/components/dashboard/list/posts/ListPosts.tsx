import Link from "next/link";
import Button from "@/app/components/ui/Button";

type ListPostsProps = {
  draft: boolean;
  posts: Post[];
  title: string;
  href: string;
  buttonTitle: string;
};

type Post = {
  id: number;
  createdDate: Date;
  updatedDate: Date;
  title: string;
  content: string;
  categoryId: number;
  description: string;
  slug: string;
  postImageId: number | null;
  draft: boolean;
  category: {
    id: number;
    name: string;
    slug: string;
    title: string | null;
    content: string | null;
    description: string | null;
    postImageId: number | null;
    createdDate: Date;
    updatedDate: Date;
  };
};

const ListPosts: React.FC<ListPostsProps> = async ({
  draft,
  posts,
  title,
  href,
  buttonTitle,
}) => {
  return (
    <>
      <h2 className="bg-gray-700 text-xl bold text-white rounded mb-12 p-5 font-bold">
        {title}の一覧
      </h2>
      <div className="flex flex-col border border-gray-500 sm:flex-row py-4 items-center w-full sm:w-auto">
        <p className="sm:border-r border-gray-500  w-full px-2 mb-0 sm:w-auto min-w-[100px]">
          投稿日
        </p>
        <p className="sm:border-r flex-wrap  w-full border-gray-500 mb-0 px-2  sm:w-auto min-w-[174px]">
          カテゴリ
        </p>
        <p className=" flex-wrap  w-full border-gray-500 mb-0 px-2 sm:w-auto  min-w-[250px] max-w-[650px]">
          タイトル
        </p>
      </div>
      <div className="mb-10">
        {posts.map((post) => {
          const formattedCreatedDate = new Date(
            post.createdDate
          ).toLocaleDateString();
          return (
            <div
              key={post.id}
              className="flex justify-between flex-col sm:flex-row border-b border-gray-500 w-full"
            >
              <div className="flex flex-col  sm:flex-row py-4 items-center w-full sm:w-auto">
                <p className="sm:border-r border-gray-500  w-full mb-0 px-2 sm:w-auto min-w-[100px]">
                  {formattedCreatedDate}
                </p>
                <p className="sm:border-r flex-wrap  w-full border-gray-500 mb-0 px-2 sm:w-auto min-w-[174px]">
                  {post.category.name.length > 9
                    ? `${post.category.name.slice(0, 9)}...`
                    : post.category.name}
                </p>
                <p className="mb-0 px-2 w-full sm:w-auto min-w-[250px] max-w-[650px]">
                  {post.title && post.title.length > 33
                    ? `${post.title.slice(0, 33)}...`
                    : post.title}
                </p>
              </div>
              <div className="flex sm:justify-end items-center my-4 sm:max-w-[240px]">
                {draft === true && (
                  <Link
                    href={`/${post.category.slug}/${post.slug}`}
                    target="blank"
                  >
                    <Button color="blue" size="small">
                      ページ
                    </Button>
                  </Link>
                )}
                <Link href={`/dashboard/post/${post.id}`}>
                  <Button color="gray" size="small">
                    編集
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
        <Button color="blue" size="normal" className="my-6">
          <Link href={href}>{buttonTitle}</Link>
        </Button>
      </div>
    </>
  );
};

export default ListPosts;
