export const login = async (username: string, password: string) => {
    const res = await fetch('https://todo-api-8r0h.onrender.com/api/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.error || 'Login failed')
    }
    return data.token
}
