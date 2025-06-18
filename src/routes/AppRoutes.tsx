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
            <Route
                path='/'
                element={
                    <Navigate to={isAuthenticated() ? '/todos' : '/login'} />
                }
            />
            <Route
                path='/login'
                element={
                    isAuthenticated() ? <Navigate to='/todos' /> : <Login />
                }
            />
            <Route
                path='/todos'
                element={
                    <PrivateRoute>
                        <Todos />
                    </PrivateRoute>
                }
            />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}
