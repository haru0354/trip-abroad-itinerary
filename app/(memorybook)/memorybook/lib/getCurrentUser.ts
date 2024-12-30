import { getServerSession } from "next-auth";
import { authOptions } from "@/app/components/util/authOptions";
import prisma from "@/app/lib/prisma";

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
    return null;
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
    return null;
  }
}
