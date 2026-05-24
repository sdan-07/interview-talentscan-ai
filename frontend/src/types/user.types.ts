export interface User{
    username: string,
    email: string,
    password?: string
}

export interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export interface UserLoginCredential {
    username: string,
    email: string
}
