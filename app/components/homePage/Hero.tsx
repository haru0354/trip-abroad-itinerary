import Image from "next/image";
import SignupButton from "../ui/SignupButton";

const Hero = () => {
  return (
    <>
      <div className="relative bg-sky-200 md:h-[600px] h-[300px] w-full flex items-center">
        <Image
          src="/hero_image.JPG"
          alt="Description of your image"
          priority
          fill
          style={{
            objectFit: "cover",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex-col justify-center items-center md:w-[440px] w-[340px] md:h-[260px] h-[240px]  py-4 px-2 bg-white md:opacity-90 opacity-80 rounded text-center">
            <p className="font-semibold text-lg md:text-2xl pb-3">
              旅程表が作成できるしおりアプリ
            </p>
            <p className="font-bold text-lg md:text-2xl pb-3 text-sky-500">
              「旅のメモリーブック」
            </p>
            <p className="md:text-lg pb-1">国内旅行・海外旅行で使える</p>
            <p className="md:text-lg pb-5">
              PC・スマホ・タブレット対応の無料アプリ
            </p>
            <SignupButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
