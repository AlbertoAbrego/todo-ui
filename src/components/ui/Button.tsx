import type { ReactNode } from 'react'

interface ButtonProps {
    onClick: () => void
    children: ReactNode
    variant?: 'primary' | 'danger' | 'secondary' | 'success'
    className?: string
    type?: 'button' | 'submit' | 'reset' | undefined
    disabled?: boolean
}
export const Button: React.FC<ButtonProps> = ({
    onClick,
    children,
    variant = 'primary',
    className = '',
    type = 'button',
    disabled = false,
}) => {
    const base = 'px-4 py-1 rounded text-sm font-semibold transition'
    const variants = {
        primary: 'bg-primary-dark text-white hover:bg-primary-ligth',
        danger: 'bg-red-700 text-gray-300 hover:bg-red-600',
        secondary: 'bg-gray-600 text-gray-300 hover:bg-gray-500',
        success: 'bg-green-600 text-white hover:bg-green-500',
    }
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={`${base} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    )
}
