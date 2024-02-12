import Image from "next/image";

type Section1ColumnProps = {
  src: string;
  alt: string;
  name: string;
  content: string;
};

const Section1Column: React.FC<Section1ColumnProps> = ({ src, alt, name, content }) => {
  return (
    <>
      <div>
          <div>
            <Image
                src={src}
                alt={alt}
                width={250}
                height={250}
                objectFit="contain"
              ></Image>
          </div>
          <div>
            <h2>{name}</h2>
            <p>{content}</p>
          </div>
      </div>
    </>
  );
};

export default Section1Column;
