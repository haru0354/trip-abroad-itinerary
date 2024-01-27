'use client';

import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';


type ButtonChildren = {
    children: ReactNode;
    formAction?: (data: FormData) => Promise<void> | Promise<never>;
}

const Button: React.FC<ButtonChildren> = ({ children, formAction }) => {
    const { pending } = useFormStatus();

    return (
        <button
            className={`bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${pending ? 'opacity-100' : ''}`}
            type="submit" formAction={formAction} disabled={pending} >
            {children}
        </button>
    );
}


export default Button;