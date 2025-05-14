"use client";

import { signOut } from "next-auth/react";

import Button from "@/app/components/ui/button/Button";

const BlogLogoutButton = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/admin" });
  };

  return (
    <Button
      onClick={handleLogout}
      color="white"
      size="normal"
      type="button"
      className="rounded mt-4"
    >
      ログアウト
    </Button>
  );
};

export default BlogLogoutButton;
