interface InputProps {
    type?: string
    value: string
    setValue?: (value: string) => void
    label?: string
    disabled?: boolean
}
export const Input: React.FC<InputProps> = ({
    type = 'text',
    value,
    setValue,
    label,
    disabled = false,
}) => {
    return (
        <div>
            <label className='block text-sm font-medium mb-1'>
                {label !== null ? label : ''}
            </label>
            <input
                type={type}
                className='w-full px-3 py-2 rounded bg-neutral-600 text-white'
                value={value}
                onChange={(e) => setValue!(e.target.value)}
                disabled={disabled}
                required
            />
        </div>
    )
}
