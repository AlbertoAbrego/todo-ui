interface TodoFilterProps {
    filter: 'all' | 'pending' | 'completed'
    setFilter: (filter: 'all' | 'pending' | 'completed') => void
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
    filter,
    setFilter,
}) => {
    return (
        <div className='border-b border-neutral-600 mb-4'>
            <nav className='flex space-x-4'>
                {['all', 'pending', 'completed'].map((key) => (
                    <button
                        key={key}
                        onClick={() =>
                            setFilter(key as 'pending' | 'completed' | 'all')
                        }
                        className={`px-4 py-2 text-sm font-medium border-b-2 ${
                            filter === key
                                ? 'border-primary-dark text-white'
                                : 'border-transparent text-gray-400 hover:text-white'
                        }`}
                    >
                        {key === 'all'
                            ? 'All'
                            : key === 'pending'
                            ? 'Pending'
                            : 'Completed'}
                    </button>
                ))}
            </nav>
        </div>
    )
}
