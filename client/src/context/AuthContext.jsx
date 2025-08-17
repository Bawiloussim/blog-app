import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Vérifie le token dans localStorage au chargement
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
        try {
            const decoded = jwt_decode(token);
            setUser({ id: decoded.id });
        } catch (err) {
            localStorage.removeItem("token");
        }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        const decoded = jwt_decode(token);
        setUser({ id: decoded.id });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};
