import { getPosts } from "@/app/(blog)/lib/service/blogServiceMany";
import ListPosts from "./ListPosts";

const ListDraftFalsePosts = async ({}) => {
  const posts = await getPosts("category");

  const sortedDraftFalsePosts = posts
    .filter((post) => post.draft === false)
    .sort((a, b) => b.id - a.id);

  return (
    <>
      <ListPosts
        draft={false}
        posts={sortedDraftFalsePosts}
        title="未公開記事(下書き保存) "
      />
    </>
  );
};

export default ListDraftFalsePosts;
