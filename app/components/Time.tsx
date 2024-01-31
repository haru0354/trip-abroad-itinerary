type TimeProps = {
  defaultValue?: string;
};

const Time: React.FC<TimeProps> = ({ defaultValue }) => {
  return (
    <div>
      <label
        className="block  text-gray-600 text-sm font-bold mb-1 mt-4"
        htmlFor="time"
        >
        時間
      </label>
      <input
        type="time"
        name="time"
        id="time"
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Time;
