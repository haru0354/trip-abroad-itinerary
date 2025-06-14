"use client";

import { useSession } from "next-auth/react";

import SignupModal from "./SignupModal";
import ButtonNextLink from "@/app/components/ui/button/ButtonNextLink";

const SignupOrDashboardButton = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <ButtonNextLink href="/memorybook/dashboard" className="my-2 rounded">
          ダッシュボードへ
        </ButtonNextLink>
      ) : (
        <SignupModal id="last-signup" />
      )}
    </div>
  );
};

export default SignupOrDashboardButton;
