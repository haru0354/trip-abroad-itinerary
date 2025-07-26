import MainContainer from "@/app/components/layout/MainContainer";
import AuthContext from "@/app/context/AuthContext";
import ToastContext from "@/app/context/ToastContext";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainContainer bgNone={true}>
      <div className="w-full px-1 md:px-4">
        <AuthContext>
          <ToastContext />
          {children}
        </AuthContext>
      </div>
    </MainContainer>
  );
}
