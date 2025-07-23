import { redirect } from "next/navigation";

import { checkUserRole } from "@/app/lib/checkUserRole";
import AdminForm from "../../components/AdminForm";

const page = async () => {
  const userRole = await checkUserRole("admin");

  if (userRole) {
    redirect("/dashboard");
  }

  return <AdminForm />;
};

export default page;
