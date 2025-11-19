import setLogin from '@/src/api/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, use, useEffect, useState } from "react";
import api from '../api/axios';

interface AuthContextType {
    isAuthenticated: boolean;
    logIn: (email: string, password: string) => Promise<boolean>;
    logOut: () => Promise<void>;
}

interface AuthState {
    token: string | null;
    authenticated: boolean;
}

const TOKEN_KEY = 'eduPost'
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading,setLoading] = useState(false)
    const [authState, setAuthState] = useState<AuthState>({
        token: null,
        authenticated: false
    })

    useEffect(() => {
        const loadAuthState = async () => {
            try {
                const token = await AsyncStorage.getItem(TOKEN_KEY);

                if(token) {
                    setIsAuthenticated(true)
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
                }

            } catch (err) {
                return {error: true, msg: (err as any).response.data.msg}
            } finally {
                setLoading(false)
            }
        }
        loadAuthState()
    },[])

    const logIn = async (email: string, password: string) => {
        const response = await setLogin(email,password)

        if(response) {
            await AsyncStorage.setItem(TOKEN_KEY,response.token)
            setIsAuthenticated(true)
            api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`

            return true
        }

        return false
    }

    const logOut = async () => {
        await AsyncStorage.removeItem(TOKEN_KEY)
        setIsAuthenticated(false)
        api.defaults.headers.common['Authorization'] = ''
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, logIn, logOut}} >
            {children}
        </AuthContext.Provider>
    )

}