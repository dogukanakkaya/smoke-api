import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import CreateModal from '../components/collection/CreateModal'
import useAuth from '../context/useAuth'
import Collections from '../components/collection/Collections'
import { CollectionProvider } from '../context/useCollection'


const Dashboard = () => {
    const { user, logout } = useAuth()
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false)

    if (!user) return <Navigate to='/login' />

    return (
        <div>
            <div className="container my-10">
                <div className="flex justify-end">
                    <button onClick={() => setShowCreateModal(true)} className="s-btn text-white bg-blue-500 hover:bg-blue-600">Create Collection <i className="bi bi-list"></i></button>
                </div>
            </div>
            <CollectionProvider>
                <Collections />
                <CreateModal show={showCreateModal} setShow={setShowCreateModal} />
            </CollectionProvider>
        </div>
    )
}

export default Dashboard