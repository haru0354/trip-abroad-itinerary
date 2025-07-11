import { getPosts } from "@/app/(blog)/lib/service/blogServiceMany";
import ListPosts from "./ListPosts";

const ListDraftTruePosts = async ({}) => {
  const posts = await getPosts("category");

  const draftTruePosts = posts.filter((post) => post.draft === true);
  
  return (
    <>
      <ListPosts draft={true} posts={draftTruePosts} title="公開記事" />
    </>
  );
};

export default ListDraftTruePosts;
