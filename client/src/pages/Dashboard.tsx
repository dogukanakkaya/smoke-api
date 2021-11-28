import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import FormModal from '../components/collection/FormModal'
import useAuth from '../context/useAuth'
import Collections from '../components/collection/Collections'
import { CollectionProvider } from '../context/collection/useCollection'
import Form from '../components/form/Form'


const Dashboard = () => {
    const { user, logout } = useAuth()
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false)

    if (!user) return <Navigate to='/login' />

    return (
        <div>
            <div className="container my-10">
                <div className="flex justify-end">
                    <Form.Button onClick={() => setShowCreateModal(true)} className="text-white bg-blue-500 hover:bg-blue-600">Create Collection <i className="bi bi-list"></i></Form.Button>
                </div>
            </div>
            <CollectionProvider>
                <Collections />
                <FormModal show={showCreateModal} setShow={setShowCreateModal} />
            </CollectionProvider>
        </div>
    )
}

export default Dashboard