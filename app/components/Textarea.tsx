
type TextareaLabel = {
    name: string;
    label: string;
    defaultValue?: string;
    placeholder?: string;
}

const Textarea: React.FC<TextareaLabel> = ({ name, label, defaultValue, placeholder }) => {
    return (
        <div>
            <label className="block text-gray-600 text-sm font-bold mb-1 mt-4" htmlFor={label}>{label}</label>
            <textarea 
                className="h-32 shadow border rounded w-full py-2 px-3" 
                name={name} 
                id={label}
                placeholder={placeholder} 
                defaultValue={defaultValue} />
        </div>
    )
}

export default Textarea;