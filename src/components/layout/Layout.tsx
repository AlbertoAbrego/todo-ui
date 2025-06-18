import type { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='min-h-screen flex flex-col bg-neutral-900 text-gray-200'>
            <Navbar />
            <main className='flex-1 px-4 py-6'>{children}</main>
            <Footer />
        </div>
    )
}
