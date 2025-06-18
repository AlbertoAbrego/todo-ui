import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Loader2, Pencil, Trash2 } from 'lucide-react'
import { Layout } from '../components/layout/Layout'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { ConfirmModal } from '../components/ui/ConfirmModal'
import { TodoForm } from '../components/pages/TodoForm'
import { TodoFilter } from '../components/pages/TodoFilter'
import { useTodo, type Todo } from '../hooks/useTodo'
import { useEditTodo } from '../hooks/useEditTodo'
import { useCreateTodo } from '../hooks/useCreateTodo'
import { useDeleteTodo } from '../hooks/useDeleteTodo'
import { useToggleTodoCompletion } from '../hooks/useToggleTodoCompletion'
import { useDeleteCompletedTodos } from '../hooks/useDeleteCompletedTodos'

export const Todos: React.FC = () => {
    const token: string | null = localStorage.getItem('token')
    const navigate = useNavigate()
    if (!token) navigate('/login')
    if (token === 'invalid') {
        localStorage.removeItem('token')
        navigate('/login')
    }
    const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all')
    const {
        todos,
        loading: loadingTodos,
        error: errorTodos,
        refetch,
    } = useTodo(token, filter, navigate)
    const {
        handleCreateTodo,
        loading: loadingCreateTodo,
        error: errorCreateTodo,
    } = useCreateTodo(token, navigate, refetch)
    const {
        handleEdit: handleEditTodo,
        loading: loadingEditTodo,
        error: errorEditTodo,
    } = useEditTodo(token, navigate, refetch)
    const {
        handleToggle,
        loading: loadingToggleComplete,
        error: errorToggleComplete,
    } = useToggleTodoCompletion(token, navigate, refetch)
    const { handleDelete: handleDeleteTodo, error: errorDeleteTodo } =
        useDeleteTodo(token, navigate, refetch)
    const {
        handleDeleteCompleted,
        loading: loadingDeleteCompleted,
        error: errorDeleteCompleted,
    } = useDeleteCompletedTodos(token, navigate, refetch)
    const [showConfirm, setShowConfirm] = useState<boolean>(false)
    const [todoIdToDelete, setTodoIdToDelete] = useState<string | null>(null)
    const [todoTitleToDelete, setTodoTitleToDelete] = useState<string | null>(
        null
    )
    const [showConfirmBulk, setShowConfirmBulk] = useState<boolean>(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editedTitle, setEditedTitle] = useState<string>('')
    const handleNewTodo = async (title: string) => {
        if (!title.trim()) return
        await handleCreateTodo(title)
    }
    const handleEdit = (id: string, currentTitle: string): void => {
        setEditingId(id)
        setEditedTitle(currentTitle)
    }
    const handleSave = async () => {
        if (!editingId) return
        await handleEditTodo(editingId, editedTitle)
        setEditingId(null)
        setEditedTitle('')
    }
    const handleToggleComplete = async (id: string) => {
        await handleToggle(id)
    }
    const handleDelete = async (id: string) => {
        await handleDeleteTodo(id)
    }
    const confirmDeleteTodo = (id: string, title: string) => {
        setTodoIdToDelete(id)
        setTodoTitleToDelete(title)
        setShowConfirm(true)
    }
    return (
        <Layout>
            <div className='max-w-3xl mx-auto bg-neutral-800 p-6 rounded shadow content-center'>
                <h1 className='text-2xl font-bold mb-4 text-center'>ToDos</h1>
                <TodoForm
                    formLabel='Create new Todo'
                    onSubmit={handleNewTodo}
                    loadingCreateTodo={loadingCreateTodo}
                />
                {errorCreateTodo && (
                    <p className='text-red-500 text-xs mt-1'>
                        {errorCreateTodo}
                    </p>
                )}
                <TodoFilter filter={filter} setFilter={setFilter}></TodoFilter>
                {errorTodos && (
                    <p className='text-red-500 text-xs mt-1'>{errorTodos}</p>
                )}
                {filter === 'completed' && todos.length > 0 && (
                    <Button
                        onClick={() => setShowConfirmBulk(true)}
                        disabled={loadingDeleteCompleted}
                        variant='danger'
                        className='mb-2'
                    >
                        <div className='col-span-full flex justify-center'>
                            <Trash2 className='inline w-4 h-4' />
                            <label className='text-sm font-semibold'>
                                Delete Completed Todos
                            </label>
                        </div>
                    </Button>
                )}
                {errorDeleteCompleted && filter === 'completed' && (
                    <label className='text-red-500 mt-1 mb-2 ml-4'>
                        {errorDeleteCompleted}
                    </label>
                )}
                {loadingTodos ? (
                    <p className='text-center text-gray-400'>
                        Loading ToDos...
                    </p>
                ) : todos.length === 0 ? (
                    <p className='text-center text-gray-400'>ToDo List empty</p>
                ) : (
                    <table className='w-full table-auto border-collapse border-t border-gray-600'>
                        <thead>
                            <tr className='border-b border-l border-r border-gray-600'>
                                <th className='w-1/2 py-4 text-center font-semibold'>
                                    Title
                                </th>
                                <th className='w-1/8 py-4 text-center font-semibold border-l border-r border-gray-600'>
                                    Status
                                </th>
                                <th className='w-2/8 py-4 text-center font-semibold'>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map((todo: Todo) => {
                                return (
                                    <tr
                                        key={todo.id}
                                        className='border-b border-l border-r border-gray-600'
                                    >
                                        <td className='px-4 py-2 text-left'>
                                            {editingId === todo.id ? (
                                                <>
                                                    <Input
                                                        value={editedTitle}
                                                        setValue={
                                                            setEditedTitle
                                                        }
                                                        disabled={
                                                            loadingEditTodo
                                                        }
                                                    />
                                                    {errorEditTodo && (
                                                        <p className='text-red-500 text-xs mt-1'>
                                                            {errorEditTodo}
                                                        </p>
                                                    )}
                                                    {errorDeleteTodo && (
                                                        <p className='text-red-500 text-xs mt-1'>
                                                            {errorDeleteTodo}
                                                        </p>
                                                    )}
                                                    {errorToggleComplete && (
                                                        <p className='text-red-500 text-xs mt-1'>
                                                            {
                                                                errorToggleComplete
                                                            }
                                                        </p>
                                                    )}
                                                </>
                                            ) : (
                                                todo.title
                                            )}
                                        </td>
                                        <td className='px-4 py-2 text-center border-l border-r border-gray-600'>
                                            {todo.completed
                                                ? 'Completed'
                                                : 'Pending'}
                                        </td>
                                        <td className='px-4 py-2 text-center'>
                                            {!todo.completed ? (
                                                <>
                                                    <Button
                                                        onClick={() =>
                                                            handleToggleComplete(
                                                                todo.id
                                                            )
                                                        }
                                                        variant='success'
                                                        disabled={
                                                            loadingToggleComplete ||
                                                            editingId ===
                                                                todo.id
                                                        }
                                                    >
                                                        <Check className='inline w-4 h-4 mb-0.5' />
                                                    </Button>
                                                    &nbsp;
                                                    {editingId === todo.id ? (
                                                        <Button
                                                            onClick={() =>
                                                                handleSave()
                                                            }
                                                            variant='success'
                                                        >
                                                            {loadingEditTodo ? (
                                                                <Loader2 className='inline w-4 h-4 mb-0.5 animate-spin' />
                                                            ) : (
                                                                'Save'
                                                            )}
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            onClick={() =>
                                                                handleEdit(
                                                                    todo.id,
                                                                    todo.title
                                                                )
                                                            }
                                                            variant='secondary'
                                                        >
                                                            <Pencil className='inline w-4 h-4 mb-0.5' />
                                                        </Button>
                                                    )}
                                                    &nbsp;
                                                </>
                                            ) : null}
                                            <Button
                                                onClick={() =>
                                                    confirmDeleteTodo(
                                                        todo.id,
                                                        todo.title
                                                    )
                                                }
                                                variant='danger'
                                            >
                                                <Trash2 className='inline w-4 h-4 mb-0.5' />
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}
            </div>
            <ConfirmModal
                open={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={() => {
                    if (todoIdToDelete) handleDelete(todoIdToDelete)
                }}
                title='Are you sure you want to delete this ToDo?'
                message={todoTitleToDelete!}
                confirmText='Delete'
            />
            <ConfirmModal
                open={showConfirmBulk}
                onClose={() => setShowConfirmBulk(false)}
                onConfirm={() => {
                    handleDeleteCompleted()
                }}
                title='Are you sure you want to delete all completed ToDos?'
                message='This action cannot be undone.'
                confirmText='Delete All Completed'
            />
        </Layout>
    )
}
