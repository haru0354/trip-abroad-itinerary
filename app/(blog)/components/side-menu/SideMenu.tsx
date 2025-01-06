import SideCategoryMenu from "@/app/(blog)/components/side-menu/parts/SideCategoryMenu";
import SideNewArticles from "@/app/(blog)/components/side-menu/parts/SideNewArticles";
import SideImage from "@/app/(blog)/components/side-menu/parts/SideImage";

const SideMenu = () => {
  return (
    <div className="flex flex-col items-center py-2 bg-white">
      <SideImage
        src="/travel_memory_thumbnail.jpg"
        alt="旅のメモリーブックのサムネイル"
        href="/memorybook"
        textTitle="海外旅行のしおりアプリ"
      />
      <SideCategoryMenu />
      <SideNewArticles />
    </div>
  );
};

export default SideMenu;
