import { redirect } from "next/navigation";

import { checkUserRole } from "@/app/lib/checkUserRole";
import AdminForm from "@/app/(blog)/components/AdminForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ログイン画面",
  robots: {
    index: false,
  },
};

const page = async () => {
  const userRole = await checkUserRole("admin");

  if (userRole) {
    redirect("/dashboard");
  }

  return <AdminForm />;
};

export default page;
