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
          width={680}
          height={400}
          priority
          className="block mx-auto mb-8"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      )}
    </>
  );
};

export default ArticleTop;
