import { useState } from 'react'
import { deleteTodo } from '../api/todos'
import type { NavigateFunction } from 'react-router-dom'

export const useDeleteTodo = (
    token: string | null,
    navigate: NavigateFunction,
    onSuccess?: (deletedResponse: string) => void
) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const handleDelete = async (id: string) => {
        setLoading(true)
        setError('')
        try {
            await deleteTodo(token!, id, navigate)
            onSuccess?.(id)
        } catch (err) {
            console.log('Failed to delete todo: ', err)
            setError('Failed to delete todo')
        } finally {
            setLoading(false)
        }
    }
    return { handleDelete, loading, error }
}
