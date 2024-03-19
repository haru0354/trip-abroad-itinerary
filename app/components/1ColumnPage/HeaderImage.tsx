import Image from "next/image";

const HeaderImage = () => {
  return (
    <div className="bg-sky-100 w-full">
      <Image
        src="/header-image.png"
        alt="英語は話せなくても旅行はできる"
        width={1150}
        height={600}
        className="mx-auto"
        priority
      />
    </div>
  );
};

export default HeaderImage;
