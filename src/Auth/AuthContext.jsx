import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [auth, setAuth] = useState({ token: null, isAuthenticated: false, loading: true });

    useEffect(() => {
        const token = cookies.token;
        if (token) {
            axios.post('https://shopcuathuan.shop/api/auth/validate', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    const data = response.data;
                    if (data) {
                        setAuth({ token, isAuthenticated: true, loading: false });
                    } else {
                        setAuth({ token: null, isAuthenticated: false, loading: false });
                        removeCookie('token'); // Optionally remove invalid token
                    }
                })
                .catch(() => {
                    setAuth({ token: null, isAuthenticated: false, loading: false });
                    removeCookie('token'); // Optionally remove invalid token
                });
        } else {
            setAuth({ token: null, isAuthenticated: false, loading: false });
        }
    }, [cookies.token, removeCookie]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
