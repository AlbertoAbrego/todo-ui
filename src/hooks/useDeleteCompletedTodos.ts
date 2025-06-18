import { useState } from 'react'
import { deleteCompletedTodos } from '../api/todos'
import type { NavigateFunction } from 'react-router-dom'

export const useDeleteCompletedTodos = (
    token: string | null,
    navigate: NavigateFunction,
    onSuccess?: (deleted: string) => void
) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const handleDeleteCompleted = async () => {
        setLoading(true)
        setError('')
        try {
            const response = await deleteCompletedTodos(token!, navigate)

            onSuccess?.(response)

            return true
        } catch (error) {
            console.error('Error deleting completed todos:', error)
            setError('Only authorized users can delete ALL completed todos.')
        } finally {
            setLoading(false)
        }
    }

    return { handleDeleteCompleted, loading, error }
}
