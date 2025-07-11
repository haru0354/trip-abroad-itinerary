import { Metadata } from "next";

import { blogBrandTitle, blogDescription } from "@/app/(blog)/config/blogConfig";
import { getPost } from "@/app/(blog)/lib/service/blogServiceUnique";

export const generateMetadata = async ({
  params,
}: {
  params: { post_slug: string };
}): Promise<Metadata> => {
  const post = await getPost("slug", params.post_slug);

  if (!post?.draft) {
    return {
      title: `投稿が存在しません | ${blogBrandTitle}`,
      description: `${blogDescription}`,
      robots: {
        index: false,
      },
    };
  } else {
    return {
      title: `${post?.title} | ${blogBrandTitle}`,
      description: post?.description,
    };
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
