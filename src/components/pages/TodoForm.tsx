import { Plus } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { useState } from 'react'

interface TodoFormProps {
    formLabel?: string
    onSubmit: (title: string) => void
    loadingCreateTodo?: boolean
}

export const TodoForm: React.FC<TodoFormProps> = ({
    formLabel = '',
    onSubmit,
    loadingCreateTodo = false,
}) => {
    const [newTodo, setNewTodo] = useState<string>('')
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(newTodo)
        setNewTodo('')
    }
    return (
        <form
            className='w-full bg-neutral-900 p-6 rounded shadow mb-5'
            onSubmit={handleSubmit}
        >
            {
                <label className='block text-sl font-medium mb-1 '>
                    {formLabel !== '' ? formLabel : ''}
                </label>
            }
            <div className='grid grid-cols-11'>
                <div className='col-span-10'>
                    <Input
                        value={newTodo}
                        setValue={setNewTodo}
                        disabled={loadingCreateTodo}
                    />
                </div>
                <div className='col-span-1 ml-2 mt-1'>
                    <Button
                        onClick={() => {}}
                        variant='success'
                        type='submit'
                        disabled={loadingCreateTodo}
                    >
                        <Plus className='inline w-5 h-8 ' />
                    </Button>
                </div>
            </div>
        </form>
    )
}
