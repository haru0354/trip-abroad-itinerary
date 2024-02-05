"use client";
import Image from "next/image";
import { User } from "@prisma/client";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useLoginModal from "../hooks/useLoginModal";
import useSignupModal from "../hooks/useSignupModal";
import useProfileModal from "../hooks/useProfile";

type MenuProps = {
  currentUser: User | null;
};

const Menu: React.FC<MenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const loginModal = useLoginModal();
  const signupModal = useSignupModal();
  const profileModal = useProfileModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div>
      <div onClick={toggleOpen}>
        <Image src={"/default.png"} alt="avatar"   width={100}
  height={100} />
      </div>

      {isOpen && (
        <div>
          <div>
            {currentUser ? (
              <>
                <MenuItem
                  label="プロフィール"
                  onClick={() => {
                    profileModal.onOpen();
                    setIsOpen(false);
                  }}
                />
                <MenuItem
                  label="ログアウト"
                  onClick={() => {
                    profileModal.onOpen();
                    setIsOpen(false);
                  }}
                />
              </>
            ) : (
              <>
                <MenuItem
                  label="ログイン"
                  onClick={() => {
                    loginModal.onOpen();
                    setIsOpen(false);
                  }}
                />
                <MenuItem
                  label="サインアップ"
                  onClick={() => {
                    signupModal.onOpen();
                    setIsOpen(false);
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
