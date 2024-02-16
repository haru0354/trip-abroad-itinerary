"use client"

import Select from "../ui/Select"
import Form from "../ui/Form"

type Post = {
    category: string;
}

type CategoryFormProps = {
    posts?:  Post | null | undefined;
}

const CategoryForm:React.FC<CategoryFormProps> = ({ posts }) => {

  return (
    <>
        <Select
            name={"category"}
            label={"カテゴリ"}
            defaultValue={posts?.category}
          />
        <Form
            name={"category"}
            label={"カテゴリ"}
            defaultValue={posts?.category}
        />
    </>
  )
}

export default CategoryForm