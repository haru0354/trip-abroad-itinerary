
type TextareaLabel = {
    label: string;
    defaultValue?: string | undefined;
    name?: string;
    placeholder?: string;
}

const Textarea: React.FC<TextareaLabel> = ({ label, defaultValue, placeholder = "メモする内容を記載してください", name = "content" }) => {
    return (
        <>
            <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">{label}</label>
            <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name={name} placeholder={placeholder} defaultValue={defaultValue} />
        </>
    )
}

export default Textarea;