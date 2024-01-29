
type TextareaLabel = {
    name: string;
    label: string;
    defaultValue?: string;
    placeholder?: string;
}

const Textarea: React.FC<TextareaLabel> = ({ name, label, defaultValue, placeholder }) => {
    return (
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">{label}</label>
            <textarea 
                className="h-32 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                name={name} 
                placeholder={placeholder} 
                defaultValue={defaultValue} />
        </div>
    )
}

export default Textarea;