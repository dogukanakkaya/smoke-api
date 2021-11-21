import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import InnerApp from './InnerApp'

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <InnerApp />
            </AuthProvider>
        </BrowserRouter>
    )
}
export default App;
