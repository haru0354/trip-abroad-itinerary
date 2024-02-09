type DateProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};

const Date: React.FC<DateProps> = ({ value, onChange }) => {
  return (
    <div>
      <label
        className="block text-gray-600 text-sm font-bold  mb-1 mt-4"
        htmlFor="date"
      >
        日付:
      </label>
      <input type="date" id="date" name={"date"} value={value} onChange={onChange} className="shadow border rounded py-2 px-2" />
    </div>
  );
};

export default Date;
