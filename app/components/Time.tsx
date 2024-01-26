type TimeProps = {
  defaultValue?: string;
}

const Time:React.FC<TimeProps> = ({defaultValue}) => {
  return (
    <>
    <p>時間:</p>
    <input type="time" name={"time"} defaultValue={defaultValue}/>
    </>
  )
}

export default Time