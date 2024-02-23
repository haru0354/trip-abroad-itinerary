import Image from "next/image";

type ArticleTopProps = {
  title: string | undefined;
  src: string;
  alt: string;
};

const ArticleTop: React.FC<ArticleTopProps> = ({ title, src, alt }) => {
  return (
    <>
      <h2 className="text-3xl py-8 text-gray-700 font-bold">{title}</h2>
      <Image src={src} alt={alt} width={650} height={380} className="mx-auto mb-8" />
    </>
  );
};

export default ArticleTop;
