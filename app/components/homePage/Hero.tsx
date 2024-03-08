import Image from "next/image";
import Button from "../ui/Button";
import SignupButton from "../ui/SignupButton";

const Hero = () => {
  return (
    <>
      <div className="bg-sky-200 h-[600px] w-full flex items-center">
        <div className="max-w-[76rem] mx-auto">
          <div className="flex-col justify-center items-center w-[350px] h-[200px] p-6 bg-white rounded text-center">
            <SignupButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
