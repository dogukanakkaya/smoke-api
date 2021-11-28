import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Form from '../components/form/Form'
import useAuth from '../context/useAuth'

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
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Input type="email" onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} value={email} autoFocus={true} />
                                <Form.Label>Email</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input type="password" onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} value={password} />
                                <Form.Label>Password</Form.Label>
                            </Form.Group>

                            <div className="mb-6 flex justify-end">
                                <Form.Button type="submit" disabled={loading} className="text-white bg-green-500 border-green-500 hover:bg-green-600">{loading ? <>Wait <i className='bi bi-arrow-repeat inline-block animate-spin' /></> : <>Login <i className="bi bi-box-arrow-in-right"></i></>}</Form.Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login