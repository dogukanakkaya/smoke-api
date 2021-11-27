import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { request } from '../utils/request'
import { BASE_URL } from '../utils/config'

import { useNavigate } from 'react-router-dom'

interface IUser {
    firstName: string
    lastName: string
    email: string
}

interface IAuthContext {
    user: IUser | null
    loading: boolean
    login: (email: string, password: string) => void
    logout: () => void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            setLoading(true)
            const { data } = await request.get(`/me`)

            if (data.status) {
                setUser(data.user)
            }
            setLoading(false)
        })()
    }, [])

    const login = async (email: string, password: string) => {
        setLoading(true)
        const { data } = await request.post(`${BASE_URL}/auth/login`, { email, password })

        if (data.status) {
            setUser(data.user)
            navigate('/')
        }
        setLoading(false)
    }

    const logout = async () => {
        const { data } = await request.post(`${BASE_URL}/auth/logout`)

        if (data.status) {
            setUser(null)
            navigate('/login')
        }
    }

    const memoedValue = useMemo(() => ({
        user,
        loading,
        login,
        logout
    }), [user, loading]);

    return (
        <AuthContext.Provider value={memoedValue}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext)
}