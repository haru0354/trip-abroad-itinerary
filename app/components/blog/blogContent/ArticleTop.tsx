import Image from "next/image";

type ArticleTopProps = {
  src: string | undefined;
  alt: string | undefined;
};

const ArticleTop: React.FC<ArticleTopProps> = ({ src, alt }) => {
  return (
    <>
      {src && alt && (
        <Image
          src={src}
          alt={alt}
          width={650}
          height={428}
          style={{
            width: "650px",
            height: "auto",
          }}
          className="block mx-auto mb-8"
        />
      )}
    </>
  );
};

export default ArticleTop;
