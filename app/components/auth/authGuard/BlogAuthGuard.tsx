import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../../../api/auth/[...nextauth]/route";

type AuthGuardContextProps = {
  children: React.ReactNode;
};

const BlogAuthGuard: React.FC<AuthGuardContextProps> = async ({
  children,
}) => {
  const session = await getServerSession(authOptions);

  const { ADMIN_USERNAME } = process.env;

  if (session && session.user?.name === ADMIN_USERNAME) {
    return <>{children}</>;
  } else {
    redirect("/admin");
  }
};

export default BlogAuthGuard;
