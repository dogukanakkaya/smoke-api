import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Login = () => {
    const { user, loading, login } = useAuth()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()

        login(email, password)
    }

    if (user) return <Navigate to='/' />

    return (
        <div className="flex items-center min-h-screen bg-gray-100">
            <div className="container mx-auto">
                <div className="max-w-md mx-auto my-10 p-5 rounded-md shadow-sm bg-white">
                    <div className="text-center">
                        <h1 className="my-3 text-3xl font-semibold text-gray-700">Login</h1>
                    </div>
                    <div className="m-7">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="s-label">
                                    Email
                                </label>
                                <input className="s-input" type="email" onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-6">
                                <label className="s-label">
                                    Password
                                </label>
                                <input className="s-input" type="password" onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                            </div>
                            <div className="mb-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`s-btn flex items-center justify-center text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 ${loading ? 'opacity-60' : ''}`}
                                >
                                    {loading ? <i className='bi bi-arrow-counterclockwise animate-spin' /> : <>Submit</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login