type DateProps = {
  defaultValue?: string;
}

const Date:React.FC<DateProps> = ({defaultValue}) => {
  return (
    <>
        <p>日付:
        </p>
        <input type="date" name={"date"} defaultValue={defaultValue} />
    </>
  )
}

export default Date