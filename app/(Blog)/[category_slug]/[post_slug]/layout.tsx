import { Metadata } from "next";

import { getPost } from "@/app/components/lib/BlogServiceUnique";

export const generateMetadata = async ({
  params,
}: {
  params: { post_slug: string };
}): Promise<Metadata> => {
  const post = await getPost("slug", params.post_slug)

  if (!post?.draft) {
    return {
      title: "投稿が存在しません | トラベルメモリー",
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
