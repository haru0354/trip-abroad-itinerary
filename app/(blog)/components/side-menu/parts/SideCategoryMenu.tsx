import Link from "next/link";

import { getCategories } from "@/app/(blog)/lib/service/blogServiceMany";
import SideMenuContainer from "./SideMenuContainer";

const SideCategoryMenu = async () => {
  const categories = await getCategories("posts");

  if (!categories) {
    return null;
  }

  return (
    <SideMenuContainer title="カテゴリ">
      {categories.map((category) => {
        if (
          !category ||
          ((!category.title || category.title === "") &&
            category.posts.every((post) => !post.draft))
        ) {
          return null;
        }

        return (
          <ul key={category.id}>
            <li className="hover:bg-blog-hoverBlue transition duration-300">
              <Link href={`/${category.slug}`} className="block px-2 py-4">
                {category.name}
              </Link>
            </li>
          </ul>
        );
      })}
    </SideMenuContainer>
  );
};

export default SideCategoryMenu;
