import MainContainer from "@/app/components/layout/MainContainer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainContainer>
      <div className="w-full px-1 md:px-4"> {children}</div>
    </MainContainer>
  );
}
