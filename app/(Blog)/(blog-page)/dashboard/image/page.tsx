import ListImages from "@/app/(blog)/components/dashboard/list/ListImages";
import ButtonNextLink from "@/app/components/ui/button/ButtonNextLink";

const page = () => {
  return (
    <>
      <ListImages />
      <div className="text-center">
        <ButtonNextLink href="/dashboard/image/new-image" className="my-+6 rounded">
          画像の追加へ
        </ButtonNextLink>
      </div>
    </>
  );
};

export default page;
