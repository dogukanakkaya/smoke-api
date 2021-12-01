import React, { useState } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import useAuth from '../context/useAuth'
import { CollectionProvider } from '../context/collection/useCollection'
import Sidebar from '../components/collection/Sidebar'
import RequestArea from '../components/request/RequestArea'
import FormModal from '../components/collection/FormModal'
import { RequestProvider } from '../context/request/useRequest'
import { Grid } from '../components/grid/Grid'

const Dashboard = () => {
    const { user, logout } = useAuth()
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false)

    if (!user) return <Navigate to='/login' />

    return (
        <CollectionProvider>
            <RequestProvider>
                <Grid cols="12">
                    <Sidebar setShowCreateModal={setShowCreateModal} />

                    <Routes>
                        <Route path="/request/:_id" element={
                            <React.Suspense fallback={<>...</>}>
                                <RequestArea />
                            </React.Suspense>
                        } />
                    </Routes>
                </Grid>
            </RequestProvider>

            <FormModal show={showCreateModal} setShow={setShowCreateModal} />
        </CollectionProvider>
    )
}

export default Dashboard