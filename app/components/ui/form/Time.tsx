type TimeProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Time: React.FC<TimeProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block mb-1 mt-4 text-sm font-bold" htmlFor="time">
        時間
      </label>
      <input
        type="time"
        name="time"
        id="time"
        value={value}
        onChange={onChange}
        className="py-2 px-2 border rounded shadow"
      />
    </div>
  );
};

export default Time;
