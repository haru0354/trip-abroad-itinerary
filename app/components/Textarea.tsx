
type TextareaLabel = {
    name: string;
    label: string;
    defaultValue?: string;
    placeholder?: string;
}

const Textarea: React.FC<TextareaLabel> = ({ name, label, defaultValue, placeholder }) => {
    return (
        <>
            <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">{label}</label>
            <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name={name} placeholder={placeholder} defaultValue={defaultValue} />
        </>
    )
}

export default Textarea;