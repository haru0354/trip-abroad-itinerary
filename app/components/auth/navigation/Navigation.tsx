"use client";
import Link from "next/link";

import { User } from "@prisma/client";
import Menu from "./Menu";

type NavigationProps = {
  currentUser: User | null
}

const Navigation: React.FC<NavigationProps> = ({ currentUser }) => {

  return (
    <>
      <Link href="/">
      Navigation
      </Link>
      <div>
        <Menu currentUser={currentUser} />
      </div>
    </>
  );
};

export default Navigation;
