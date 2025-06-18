import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'

export const Navbar: React.FC = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <nav className='bg-primary-dark px-6 py-4 text-white shadow-md'>
            <div className='max-w-7xl mx-auto'>
                <h1 className='text-xl font-bold text-center'>ToDo App</h1>
            </div>
            {token && (
                <div className='max-w-full mx-auto flex justify-end mt-2'>
                    <Button
                        type='button'
                        variant='secondary'
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </div>
            )}
        </nav>
    )
}
