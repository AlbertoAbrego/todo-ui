import { Navigate, Route, Routes } from 'react-router-dom'
import type { JSX } from 'react'
import { Login } from '../views/Login'
import { Todos } from '../views/Todos'

const isAuthenticated = () => {
    const token = localStorage.getItem('token')
    return !!token
}

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    return isAuthenticated() ? children : <Navigate to='/login' />
}

export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route
                path='/todos'
                element={
                    <PrivateRoute>
                        <Todos />
                    </PrivateRoute>
                }
            />
            {isAuthenticated() && (
                <Route path='/' element={<Navigate to='/todos' />} />
            )}
            <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
    )
}
