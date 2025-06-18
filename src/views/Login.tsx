import { useState } from 'react'
import { Layout } from '../components/layout/Layout'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/auth'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Loader2 } from 'lucide-react'

export const Login: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const token = await login(username, password)
            localStorage.setItem('token', token)
            navigate('/todos')
        } catch (err) {
            setLoading(false)
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('An unexpected error occurred while logging in.')
            }
        }
    }
    return (
        <Layout>
            <div className='max-w-md mx-auto bg-neutral-800 p-6 rounded shadow'>
                <h1 className='text-x1 font-bold mb-4 text-center'>Login</h1>
                <form onSubmit={handleLogin} className='space-y-4'>
                    <Input
                        value={username}
                        setValue={setUsername}
                        label='Username'
                    />
                    <Input
                        type='password'
                        value={password}
                        setValue={setPassword}
                        label='Password'
                    />
                    {error && <p className='text-red-400 text-sm'>{error}</p>}
                    <div className='text-center mt-4'>
                        {loading ? (
                            <Button
                                type='submit'
                                variant='secondary'
                                disabled={loading}
                                onClick={() => {}}
                            >
                                <Loader2 className='animate-spin h-5 w-5 m-1 ml-2 mr-2' />
                            </Button>
                        ) : (
                            <Button
                                type='submit'
                                variant='secondary'
                                onClick={() => {}}
                            >
                                Login
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </Layout>
    )
}
