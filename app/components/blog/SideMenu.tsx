import SideCategoryMenu from "@/app/(blog)/components/side-menu/parts/SideCategoryMenu";
import SideNewArticles from "@/app/(blog)/components/side-menu/parts/SideNewArticles";
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
