import Button from "../ui/Button";
import SignupButton from "../ui/SignupButton";

const Hero = () => {
  return (
    <>
      <div className="bg-sky-500 h-[600px] w-full flex items-center">
        <div className="max-w-[76rem] mx-auto">
          <div className="flex-col justify-center items-center w-[250px] h-[200px] p-6 bg-white rounded text-center">
            <p>テキスト</p>
            <Button className="px-10 py-3 shadow font-bold bg-sky-700 text-white hover:bg-white hover:text-black border border-sky-900">
              しおりの作成
            </Button>
            <SignupButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
