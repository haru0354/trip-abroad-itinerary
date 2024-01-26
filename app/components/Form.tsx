
type FormProps = {
    name: string;
    label: string;
    defaultValue?: string;
    placeholder?: string;
}

const Form: React.FC<FormProps> = ({ name, label, defaultValue, placeholder }) => {
    return (
        <>
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
            <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name={name} defaultValue={defaultValue} placeholder={placeholder}/>
        </>
    )
}

export default Form;