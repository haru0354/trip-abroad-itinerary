import { ReactNode, FormEvent } from 'react';

type ButtonChildren = {
    children: ReactNode;
    formAction?: (data: FormData) => Promise<void> | Promise<never>;
}

const Button: React.FC<ButtonChildren> = ({ children, formAction }) => {

    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit" formAction={formAction}>
            {children}
        </button>
    );
}


export default Button;