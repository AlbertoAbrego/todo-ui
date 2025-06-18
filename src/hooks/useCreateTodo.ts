import { useState } from 'react'
import { createTodo } from '../api/todos'
import type { Todo } from './useTodo'
import type { NavigateFunction } from 'react-router-dom'

export const useCreateTodo = (
    token: string | null,
    navigate: NavigateFunction,
    onSuccess?: (newTodo: Todo) => void
) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const handleCreateTodo = async (title: string) => {
        setLoading(true)
        setError('')
        try {
            const newTodo = await createTodo(token!, title, navigate)
            onSuccess?.(newTodo)
        } catch (err) {
            console.log('Failed to create new Todo: ', err)
            setError('Failed to create new Todo')
        } finally {
            setLoading(false)
        }
    }
    return { handleCreateTodo, loading, error }
}
