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
          height={430}
          priority
          style={{
            maxWidth: "100%",
            height: "auto",
            aspectRatio: "650 / 430",
          }}
          sizes="100vw"
          className="block mx-auto mb-8 max-w-[650px] max-h-[430px]"
        />
      )}
    </>
  );
};

export default ArticleTop;