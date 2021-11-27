import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/useAuth'

const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Login = React.lazy(() => import('./pages/Login'))

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <React.Suspense fallback={<>...</>}>
                                <Login />
                            </React.Suspense>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <React.Suspense fallback={<>...</>}>
                                <Dashboard />
                            </React.Suspense>
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}
export default App;
