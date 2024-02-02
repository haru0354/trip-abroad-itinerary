
type TimeProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

};

const Time: React.FC<TimeProps> = ({ value, onChange }) => {
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
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Time;
