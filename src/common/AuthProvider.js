import React, { createContext, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.path || "/addProduct";
    const [user, setUser] = useState({
        username: "",
        permissions: [],
    });
    const login = (user) => {
        if (user === "admin") {
            setUser({ username: user, permissions: ["add_product","update_product","delete_product","view_product"] });
        } else {
            setUser({ username: user, permissions: ["view_product"] });
        }
        navigate(redirectPath, { replace: true });
    };
    const logout = () => {
        setUser({ username: "", permissions: [] });
    };
    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
    return useContext(AuthContext);
};