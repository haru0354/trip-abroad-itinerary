import TextareaAutosize from 'react-textarea-autosize';

type TextAreaProps = {
    name: string;
    label: string;
    placeholder?: string;
    value?: string;
    defaultValue?: string | undefined;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    rows?:number;
}

const TextArea: React.FC<TextAreaProps> = ({ name, label, placeholder, value, onChange, defaultValue, rows = 3 }) => {
    return (
        <div>
            <label className="block text-gray-600 text-sm font-bold mb-1 mt-4" htmlFor={label}>{label}</label>
            <TextareaAutosize 
                className="h-26 shadow border rounded w-full py-2 px-3 min-h-[100px]" 
                name={name} 
                id={label}
                placeholder={placeholder} 
                value={value}
                onChange={onChange} 
                defaultValue={defaultValue}
                minRows={rows} 
                />
        </div>
    )
}

export default TextArea;