import { useState } from 'react'
import { updateTodoTitle } from '../api/todos'
import type { Todo } from './useTodo'
import type { NavigateFunction } from 'react-router-dom'

export const useEditTodo = (
    token: string | null,
    navigate: NavigateFunction,
    onSuccess?: (updated: Todo) => void
) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const handleEdit = async (id: string, newTitle: string) => {
        setLoading(true)
        setError('')
        try {
            const updatedTodo = await updateTodoTitle(
                token!,
                id,
                newTitle,
                navigate
            )
            onSuccess?.(updatedTodo)
        } catch (err) {
            console.log('Failed to update todo title: ', err)
            setError('Failed to update todo title')
        } finally {
            setLoading(false)
        }
    }
    return { handleEdit, loading, error }
}
