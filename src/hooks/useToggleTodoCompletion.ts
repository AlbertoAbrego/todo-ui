import { useState } from 'react'
import { toggleTodoCompletion } from '../api/todos'
import type { Todo } from './useTodo'
import type { NavigateFunction } from 'react-router-dom'

export const useToggleTodoCompletion = (
    token: string | null,
    navigate: NavigateFunction,
    onSuccess?: (todoResponse: Todo) => void
) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const handleToggle = async (todoId: string) => {
        setLoading(true)
        setError('')
        try {
            const response = await toggleTodoCompletion(
                token!,
                todoId,
                navigate
            )
            onSuccess?.(response)
        } catch (err) {
            console.error('Error toggling todo completion:', err)
            setError('Failed to toggle todo completion. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return { handleToggle, loading, error }
}
