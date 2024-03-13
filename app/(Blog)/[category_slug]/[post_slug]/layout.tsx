import prisma from "@/app/components/lib/prisma";
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { post_slug: string };
}): Promise<Metadata> => {
  const postSlug = params.post_slug;

  const posts = await prisma.post.findMany({
    where: {
      slug: postSlug,
    },
  });

  // タイトルとディスクリプションを新しいオブジェクトへ変換
  const processedPosts = posts.map((post) => {
    const postTitle = post.title;
    const postDescription = post.description;
    return {
      postTitle,
      postDescription,
    };
  });

  // タイトルとディスクリプションを特定
  const retrievedPostTitle =
    processedPosts.length > 0 ? processedPosts[0].postTitle : "";
  const retrievedDescription =
    processedPosts.length > 0 ? processedPosts[0].postDescription : "";

  return {
    title: `${retrievedPostTitle} | トラベルメモリー`,
    description: retrievedDescription,
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
