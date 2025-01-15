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
      />
    </>
  );
};

export default ListDraftTruePosts;
