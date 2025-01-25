import HeadingTwo from "../../../ui/dashboard/HeadingTwo";
import TitleList from "../../../layout/dashboard/list/TitleList";
import ListItem from "../../../layout/dashboard/list/ListItem";

type ListPostsProps = {
  draft: boolean;
  posts: Post[];
  title: string;
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

const ListPosts: React.FC<ListPostsProps> = async ({ draft, posts, title }) => {
  return (
    <>
      <HeadingTwo>{title}の一覧</HeadingTwo>
      <TitleList titles={["投稿日", "カテゴリ", "タイトル"]} />
      <div className="mb-10">
        {posts.map((post) => {
          const formattedCreatedDate = new Date(
            post.createdDate
          ).toLocaleDateString();
          return (
            <ListItem
              key={post.id}
              items={[
                { name: formattedCreatedDate, limit: 10 },
                { name: post.category.name, limit: 9 },
                { name: post.title, limit: 33 },
              ]}
              editHref={`/dashboard/post/${post.id}`}
              pageHref={
                draft ? `/${post.category.slug}/${post.slug}` : undefined
              }
            />
          );
        })}
      </div>
    </>
  );
};

export default ListPosts;
