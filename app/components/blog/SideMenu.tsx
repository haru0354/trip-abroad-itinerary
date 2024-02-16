import SideCategoryMenu from "./SideCategoryMenu";
import NewArticles from "./NewArticles";

const SideMenu = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-white rounded">
      <SideCategoryMenu />
      <NewArticles />
    </div>
  );
};

export default SideMenu;
