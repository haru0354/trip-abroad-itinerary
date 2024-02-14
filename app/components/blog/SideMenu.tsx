import Category from "./Category";
import NewArticles from "./NewArticles";
import SideTop from "./SideTop";

const SideMenu = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-white rounded mx-4">
      <Category />
      <NewArticles />
    </div>
  );
};

export default SideMenu;
