import TextareaAutosize from "react-textarea-autosize";

type TextAreaProps = {
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
};

const TextArea: React.FC<TextAreaProps> = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  defaultValue,
  rows = 3,
}) => {
  return (
    <div>
      <label className="block mb-1 mt-4 text-sm font-bold" htmlFor={label}>
        {label}
      </label>
      <TextareaAutosize
        className="w-full min-h-[100px] h-26 py-2 px-3 shadow border rounded"
        name={name}
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        minRows={rows}
      />
    </div>
  );
};

export default TextArea;
