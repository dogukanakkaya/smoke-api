import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'


const Dashboard = () => {
    const { user, logout } = useAuth()

    if (!user) return <Navigate to='/login' />

    return (
        <div>
            <h1>Dashboard</h1>
            <p onClick={() => logout()}>Logout</p>
        </div>
    )
}

export default Dashboard