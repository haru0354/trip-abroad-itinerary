type DateProps = {
  defaultValue?: string;
};

const Date: React.FC<DateProps> = ({ defaultValue }) => {
  return (
    <div>
      <p>日付:</p>
      <input type="date" name={"date"} defaultValue={defaultValue} />
    </div>
  );
};

export default Date;
