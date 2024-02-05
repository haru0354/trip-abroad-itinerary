'use client'

type MenuItemProps = {
    onClick: () => void,
    label: string
}

const MenuItem:React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div onClick={onClick}>
        {label}
    </div>
  )
}

export default MenuItem