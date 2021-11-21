import React from 'react'
import { Routes, Route } from 'react-router-dom'

const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Login = React.lazy(() => import('./pages/Login'))

function InnerApp() {
    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <React.Suspense fallback={<>Login loading...</>}>
                        <Login />
                    </React.Suspense>
                }
            />
            <Route
                path="/"
                element={
                    <React.Suspense fallback={<>Dashboard loading...</>}>
                        <Dashboard />
                    </React.Suspense>
                }
            />
        </Routes>
    );
}

export default InnerApp
