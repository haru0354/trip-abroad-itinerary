import { Metadata } from "next";
import { getPost } from "@/app/(blog)/lib/service/blogServiceUnique";

export const generateMetadata = async ({
  params,
}: {
  params: { post_slug: string };
}): Promise<Metadata> => {
  const brandTItle = process.env.NEXT_PUBLIC_WEBSITE_BRAND_TITLE;
  const siteDescription = process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION;
  const post = await getPost("slug", params.post_slug);

  if (!post?.draft) {
    return {
      title: `投稿が存在しません | ${brandTItle}`,
      description: `${siteDescription}`,
      robots: {
        index: false,
      },
    };
  } else {
    return {
      title: `${post?.title} | ${brandTItle}`,
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
