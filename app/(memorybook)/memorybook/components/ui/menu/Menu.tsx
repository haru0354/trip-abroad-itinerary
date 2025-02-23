import LoginModal from "../auth/LoginModal";
import SignupModal from "../auth/SignupModal";
import MenuItem from "./MenuItem";

type MenuProps = {
  currentUserId?: number | null;
};

const Menu: React.FC<MenuProps> = ({ currentUserId }) => {
  return (
    <>
      {currentUserId ? (
        <MenuItem />
      ) : (
        <ul className="flex items-center justify-center">
          <li className="mx-2">
            <LoginModal />
          </li>
          <li className="mx-2">
            <SignupModal textButton={true} id="header-signup" />
          </li>
        </ul>
      )}
    </>
  );
};

export default Menu;
