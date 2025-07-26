export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full max-w-[1150px] mx-auto flex flex-col md:flex-row mb-8">
      {children}
    </div>
  );
}
