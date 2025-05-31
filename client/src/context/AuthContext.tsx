/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!Cookies.get('token'));

    useEffect(() => {
        const handleTokenChange = () => {
            setIsAuthenticated(!!Cookies.get('token'));
        };

        window.addEventListener('storage', handleTokenChange);
        return () => {
            window.removeEventListener('storage', handleTokenChange);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};