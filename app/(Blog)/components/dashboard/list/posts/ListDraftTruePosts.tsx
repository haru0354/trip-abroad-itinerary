import { getPosts } from "@/app/(blog)/lib/service/blogServiceMany";
import ListPosts from "./ListPosts";

const ListDraftTruePosts = async ({}) => {
  const posts = await getPosts("category");

  const sortedDraftTruePosts = posts
    .filter((post) => post.draft === true)
    .sort((a, b) => b.id - a.id);

  return (
    <>
      <ListPosts
        draft={true}
        posts={sortedDraftTruePosts}
        title="公開記事"
        href="/dashboard/post/private-post"
        buttonTitle="未公開記事に切り替え"
      />
    </>
  );
};

export default ListDraftTruePosts;
