import { useEffect, useState } from 'react'
import { getTodos } from '../api/todos'
import type { NavigateFunction } from 'react-router-dom'

export type Todo = {
    id: string
    title: string
    completed: boolean
}

export const useTodo = (
    token: string | null,
    filter: 'all' | 'pending' | 'completed',
    navigate: NavigateFunction
) => {
    const [todos, setTodos] = useState<Todo[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState('')
    const [version, setVersion] = useState<number>(0)

    const refetch = () => setVersion((v) => v + 1)

    useEffect(() => {
        if (!token) return
        const fetchTodos = async () => {
            setLoading(true)
            setError('')
            try {
                let todosData: Todo[] = []
                if (filter === 'all') {
                    todosData = await getTodos(token, navigate)
                } else {
                    todosData = await getTodos(
                        token,
                        navigate,
                        filter === 'pending' ? false : true
                    )
                }
                setTodos(todosData)
                setError('')
            } catch (error) {
                console.error('Failed to fetch todos:', error)
                setError('Failed to load todos')
            } finally {
                setLoading(false)
            }
        }
        fetchTodos()
    }, [token, version, filter, navigate])
    return { todos, loading, error, refetch, setTodos }
}
