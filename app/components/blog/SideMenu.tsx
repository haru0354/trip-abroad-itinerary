import SideCategoryMenu from "./SideCategoryMenu";
import SideNewArticles from "./SideNewArticles";
import SideTop from "./SideTop";

const SideMenu = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-white rounded py-2">
      <SideTop />
      <SideCategoryMenu />
      <SideNewArticles />
    </div>
  );
};

export default SideMenu;
