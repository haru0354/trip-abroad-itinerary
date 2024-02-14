"use client";

import useSignupModal from "../auth/hooks/useSignupModal";

const SignupButton = () => {
  const signupModal = useSignupModal();

  return (
    <>
      <button onClick={() => {
          signupModal.onOpen();
        }} className="px-16 py-3 shadow font-bold bg-sky-700 text-white hover:bg-white hover:text-black border border-sky-900">
        しおりを作成する
      </button>
    </>
  );
};

export default SignupButton;
