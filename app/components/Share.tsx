"use client";

import { usePathname } from "next/navigation";

const Share = () => {
  const path = usePathname();

  return (
    <div className="p-4 my-8 mx-16 border border-dashed border-gray-500">
      URL:〇〇〇{path}
    </div>
  );
};

export default Share;
