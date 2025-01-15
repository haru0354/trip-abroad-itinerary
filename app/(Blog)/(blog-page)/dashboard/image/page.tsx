import ListImages from "@/app/(blog)/components/dashboard/list/ListImages";
import Button from "@/app/components/ui/Button";
import Link from "next/link";

const page = () => {
  return (
    <>
      <ListImages />
      <Button color="blue" size="normal" className="my-6">
        <Link href="/dashboard/image/new-image">画像の追加へ</Link>
      </Button>
    </>
  );
};

export default page;
