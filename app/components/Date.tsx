type DateProps = {
  defaultValue?: string;
};

const Date: React.FC<DateProps> = ({ defaultValue }) => {
  return (
    <div>
      <label
        className="block text-gray-600 text-sm font-bold  mb-1 mt-4"
        htmlFor="date"
      >
        日付:
      </label>
      <input type="date" id="date" name={"date"} defaultValue={defaultValue} />
    </div>
  );
};

export default Date;
