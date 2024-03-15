import prisma from "@/app/components/lib/prisma";
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { post_slug: string };
}): Promise<Metadata> => {
  const postSlug = params.post_slug;

  const post = await prisma.post.findUnique({
    where: {
      slug: postSlug,
    },
  });

  if (!post?.draft) {
    return {
      title: "投稿が存在しません",
      description:
    "海外旅行は記憶に残る最高の思い出になります。そのためにも必要となるのが旅行前の準備と当日の計画をしておくことです。特に英語が話せない人には必要なことでもあります。「トラベルメモリー」では初めての海外旅行や英語が話せない人向けに旅行計画の準備を紹介してます。",

      robots: {
        index: false,
      },
    };
  } else {
    return {
      title: `${post?.title} | トラベルメモリー`,
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
