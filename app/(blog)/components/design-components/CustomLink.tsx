import Link from "next/link"

type CustomLinkProps = {
    href: string;
    children: React.ReactNode;
}

const CustomLink:React.FC<CustomLinkProps> = ({ href, children}) => {
  return (
    <Link href={href}>{children}</Link>
  )
}

export default CustomLink