import { getServerSession } from "next-auth";
import { authOptions } from "../components/util/authOptions";
import prisma from "../components/lib/prisma";

const getCurrentUser = async () => {
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
};

export default getCurrentUser;
