import { getPosts } from "@/app/(blog)/lib/service/blogServiceMany";
import ListPosts from "./ListPosts";

const ListDraftFalsePosts = async ({}) => {
  const posts = await getPosts("category");

  const draftFalsePosts = posts.filter((post) => post.draft === false);

  return (
    <>
      <ListPosts
        draft={false}
        posts={draftFalsePosts}
        title="未公開記事(下書き保存) "
      />
    </>
  );
};

export default ListDraftFalsePosts;
