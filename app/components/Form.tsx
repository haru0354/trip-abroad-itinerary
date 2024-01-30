
type FormProps = {
    name: string;
    label: string;
    defaultValue?: string;
    placeholder?: string;
}

const Form: React.FC<FormProps> = ({ name, label, defaultValue, placeholder }) => {
    return (
        <div>
            <label className="block text-gray-600 text-sm font-bold mb-2">{label}</label>
            <input 
                type="text" 
                className="shadow border rounded w-full py-2 px-3"
                name={name} 
                defaultValue={defaultValue} 
                placeholder={placeholder}/>
        </div>
    )
}

export default Form;