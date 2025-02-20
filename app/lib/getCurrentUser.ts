import { getServerSession } from "next-auth";

import prisma from "@/app/lib/prisma";
import { authOptions } from "@/app/util/authOptions";

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return null;
    }

    const response = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!response) {
      return null;
    }

    return response;
  } catch (error) {
    console.error(
      "セッション中のユーザーの取得中にエラーが発生しました:",
      error
    );
    return;
  }
}

export async function getCurrentUserId() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return null;
    }

    const response = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!response) {
      return null;
    }

    const userId = response.id;
    return userId;
  } catch (error) {
    console.error("userIdの取得中にエラーが発生しました:", error);
    return;
  }
}

export async function getUserProfile() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return null;
    }

    const response = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!response) {
      return null;
    }

    const name = response.name;
    const email = response.email;

    const maskedName = name ? `${name.substring(0, 2)}*****` : "";
    const maskedEmail = email
      ? `${email.substring(0, email.indexOf("@"))}@*****${email.substring(
          email.indexOf(".")
        )}`
      : "";

    return {
      name: maskedName,
      email: maskedEmail,
    };
  } catch (error) {
    console.error("プロフィールの取得中にエラーが発生しました:", error);
    return;
  }
}

export async function getCurrentUserRole() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.role) {
      return null;
    }

    const userRole = session?.user.role;

    return userRole;
  } catch (error) {
    console.error("userRoleの取得中にエラーが発生しました:", error);
    return;
  }
}
