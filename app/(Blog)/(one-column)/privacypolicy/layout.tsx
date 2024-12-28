import { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー・免責事項",
  robots: {
    index: false,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
