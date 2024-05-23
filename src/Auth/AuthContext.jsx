import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [auth, setAuth] = useState({ token: null, isAuthenticated: false, loading: true, userData: null });
    const [token, setToken] = useState("");

    useEffect(() => {
        const tokenCookie = cookies.token;
        setToken(tokenCookie);

        if (tokenCookie) {
            axios.post('https://shopcuathuan.shop/api/auth/validate', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenCookie}`
                }
            })
                .then(response => {
                    const data = response.data;

                    if (data) {
                        setAuth({ token: tokenCookie, isAuthenticated: true, loading: false, userData: data });
                    } else {
                        setAuth({ token: null, isAuthenticated: false, loading: false, userData: null });
                        removeCookie('token'); // Optionally remove invalid token
                    }
                })
                .catch(() => {
                    setAuth({ token: null, isAuthenticated: false, loading: false, userData: null });
                    removeCookie('token'); // Optionally remove invalid token
                });
        } else {
            setAuth({ token: null, isAuthenticated: false, loading: false, userData: null });
        }
    }, [cookies.token, removeCookie]);


    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
