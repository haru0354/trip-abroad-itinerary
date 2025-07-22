import { getCurrentUserRole } from "./getCurrentUser";

export const checkUserRole = async (role: string) => {
  try {
    const userRole = await getCurrentUserRole();

    if (!userRole || userRole !== role) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("権限の確認中にエラーが発生しました:", error);
    return false;
  }
};
