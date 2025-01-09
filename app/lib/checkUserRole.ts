import { getCurrentUserRole } from "./getCurrentUser";

export const checkUserRole = async (role: string) => {
  try {
    const userRole = await getCurrentUserRole();

    if (!userRole || userRole !== role) {
      console.error("権限が必要です。");
      return false;
    }

    return true;
  } catch (error) {
    console.error("権限の確認中にエラーが発生しました:", error);
    return false;
  }
};
