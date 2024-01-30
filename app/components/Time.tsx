type TimeProps = {
  defaultValue?: string;
}

const Time:React.FC<TimeProps> = ({defaultValue}) => {
  return (
    <div>
    <p>時間:</p>
    <input type="time" name={"time"} defaultValue={defaultValue}/>
    </div>
  )
}

export default Time