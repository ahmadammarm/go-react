import { useContext } from "react";

import Cookies from "js-cookie";

import { useNavigate } from "react-router";

import { AuthContext } from "../../context/AuthContext";

export const useLogout = (): (() => void) => {
    const authContext = useContext(AuthContext);

    const { setIsAuthenticated } = authContext!;

    const navigate = useNavigate();

    const logout = (): void => {

        Cookies.remove("token");
        Cookies.remove("user");

        setIsAuthenticated(false);

        navigate("/login");
    };

    return logout;
};