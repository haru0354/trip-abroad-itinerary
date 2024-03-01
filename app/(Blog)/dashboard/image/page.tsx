import ListImages from "@/app/components/blog/(dashboard)/ListImages";

const page = () => {
  return (
    <div>
      <h2 className="bg-gray-700 text-xl bold text-white rounded mb-12 p-5 font-bold">
        画像ライブラリー
      </h2>
      <ListImages />
    </div>
  );
};

export default page;
