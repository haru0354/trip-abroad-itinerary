import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faChevronRight } from "@fortawesome/free-solid-svg-icons";

type BreadcrumbsProps = {
  categoryName: string;
  categorySlug: string;
  isCategoryDirectory?: boolean;
};
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  categoryName,
  categorySlug,
  isCategoryDirectory,
}) => {
  return (
    <span className="text-sm">
      <FontAwesomeIcon
        icon={faHouse}
        className="w-[14px] h-[14px] inline mb-[2px] mr-4"
      />
      <Link href="/">ホーム</Link>
      <FontAwesomeIcon icon={faChevronRight} className="w-[14px] h-[14px] inline mx-3"/> 
      {isCategoryDirectory ? (
        categoryName
      ) : (
        <Link href={`/${categorySlug}`}>{categoryName}</Link>
      )}
    </span>
  );
};

export default Breadcrumbs;