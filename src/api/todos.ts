import type { NavigateFunction } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL
export const getTodos = async (
    token: string,
    navigate: NavigateFunction,
    completed?: boolean
) => {
    let url = API_URL
    if (completed !== undefined) {
        url += `?completed=${completed}`
    }
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    if (res.status === 403) {
        navigate('/login')
        return
    }
    if (!res.ok) {
        throw new Error('Failed to fetch todos')
    }
    return await res.json()
}

export const createTodo = async (
    token: string,
    title: string,
    navigate: NavigateFunction
) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
    })
    if (res.status === 403) {
        navigate('/login')
        return
    }
    if (!res.ok) {
        throw new Error('Failed to create new todo')
    }
    return await res.json()
}

export const toggleTodoCompletion = async (
    token: string,
    todoId: string,
    navigate: NavigateFunction
) => {
    const res = await fetch(`${API_URL}/${todoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
    if (res.status === 403) {
        navigate('/login')
        return
    }
    if (!res.ok) {
        throw new Error('Failed to toggle todo completion')
    }
    return await res.json()
}

export const updateTodoTitle = async (
    token: string,
    todoId: string,
    title: string,
    navigate: NavigateFunction
) => {
    const res = await fetch(`${API_URL}/${todoId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
    })
    if (res.status === 403) {
        navigate('/login')
        return
    }
    if (!res.ok) {
        throw new Error('Failed to update todo title')
    }
    return await res.json()
}

export const deleteTodo = async (
    token: string,
    todoId: string,
    navigate: NavigateFunction
) => {
    const res = await fetch(`${API_URL}/${todoId}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
    if (res.status === 403) {
        navigate('/login')
        return
    }
    if (!res.ok) {
        throw new Error('Failed to delete todo')
    }
}

export const deleteCompletedTodos = async (
    token: string,
    navigate: NavigateFunction
) => {
    const user = token.split('.')[1]
    const userData = JSON.parse(atob(user))
    const role = userData.role
    if (role !== 'admin') {
        throw new Error(
            'Unauthorized: Only admins can delete ALL completed todos'
        )
    }
    const res = await fetch(`${API_URL}/completed`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
    if (res.status === 403) {
        navigate('/login')
        return
    }
    if (!res.ok) {
        throw new Error('Failed to delete completed todos')
    }
    return await res.json()
}
