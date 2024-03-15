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

  return {
    title: `${post?.title} | トラベルメモリー`,
    description: post?.description,
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
