import React, { useState } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import useAuth from '../context/useAuth'
import { CollectionProvider } from '../context/collection/useCollection'
import Sidebar from '../components/collection/Sidebar'
import Request from '../components/request/Request'
import FormModal from '../components/collection/FormModal'

const Dashboard = () => {
    const { user, logout } = useAuth()
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false)

    if (!user) return <Navigate to='/login' />

    return (
        <CollectionProvider>
            <div className="grid grid-cols-12">
                <Sidebar setShowCreateModal={setShowCreateModal} />

                <Routes>
                    <Route path="/:_id" element={
                        <React.Suspense fallback={<>...</>}>
                            <Request />
                        </React.Suspense>
                    } />
                </Routes>
            </div>

            <FormModal show={showCreateModal} setShow={setShowCreateModal} />
        </CollectionProvider>
    )
}

export default Dashboard