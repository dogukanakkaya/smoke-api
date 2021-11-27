import { Navigate } from 'react-router-dom'
import CreateModal from '../components/collection/CreateModal'
import useAuth from '../hooks/useAuth'
import Collections from '../components/collection/Collections'


const Dashboard = () => {
    const { user, logout } = useAuth()

    if (!user) return <Navigate to='/login' />

    return (
        <div>
            <div className="container my-10">
                <div className="flex justify-end">
                    <button className="s-btn text-white bg-blue-500 hover:bg-blue-600">Create Collection <i className="bi bi-list"></i></button>
                </div>
            </div>
            <Collections />
            <CreateModal />
        </div>
    )
}

export default Dashboard