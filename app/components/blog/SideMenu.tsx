import SideCategoryMenu from "./SideCategoryMenu";
import NewArticles from "./NewArticles";
import SideTop from "./SideTop";

const SideMenu = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-white rounded py-2">
      <SideTop />
      <SideCategoryMenu />
      <NewArticles />
    </div>
  );
};

export default SideMenu;
