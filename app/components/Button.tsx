import { ReactNode } from 'react';

type ButtonChildren = {
    children: ReactNode;
}

const Button: React.FC<ButtonChildren> = ({ children }) => {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            {children}
        </button>
    );
}


export default Button;