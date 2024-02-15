
type TextAreaProps = {
    name: string;
    label: string;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ name, label, placeholder, value, onChange, defaultValue }) => {
    return (
        <div>
            <label className="block text-gray-600 text-sm font-bold mb-1 mt-4" htmlFor={label}>{label}</label>
            <textarea 
                className="h-32 shadow border rounded w-full py-2 px-3" 
                name={name} 
                id={label}
                placeholder={placeholder} 
                value={value}
                onChange={onChange} 
                defaultValue={defaultValue}
                />
                
        </div>
    )
}

export default TextArea;