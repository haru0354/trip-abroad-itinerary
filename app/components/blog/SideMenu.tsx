import SideCategoryMenu from "./sideMenu/SideCategoryMenu";
import SideNewArticles from "./sideMenu/SideNewArticles";
import SideTop from "./sideMenu/SideTop";

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
