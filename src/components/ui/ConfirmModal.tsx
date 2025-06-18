import { Button } from './Button'

interface ConfirmModalProps {
    open: boolean
    onClose: () => void
    onConfirm: () => void
    title?: string
    message: string
    confirmText?: string
    cancelText?: string
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    open,
    onClose,
    onConfirm,
    title = 'Are you sure?',
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
}) => {
    if (!open) return null
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='bg-neutral-700 rounded-lg p-6 shadow-xl w-full max-w-md'>
                <h2 className='text-lg font-semibold text-white mb-4'>
                    {title}
                </h2>
                <p className='text-gray-300 mb-6'>{message}</p>
                <div className='flex justify-end gap-2'>
                    <Button
                        onClick={() => {
                            onConfirm()
                            onClose()
                        }}
                        variant='danger'
                    >
                        {confirmText}
                    </Button>
                    <Button onClick={onClose} variant='secondary'>
                        {cancelText}
                    </Button>
                </div>
            </div>
        </div>
    )
}
