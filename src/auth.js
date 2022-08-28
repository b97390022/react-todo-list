import React from "react";
import {
    useLocation,
    Navigate
} from "react-router-dom";
import { useAuthProvider } from './fetch.js'

let AuthContext = React.createContext(null);

function useAuth() {
    return React.useContext(AuthContext);
}

function AuthProvider({ children }) {
    const HexSchoolAuthProvider = useAuthProvider();
    const [user, setUser] = React.useState(()=>{
        const _user = localStorage.getItem("user");
        if (_user) return JSON.parse(_user);
        return null;
    });
    const [token, setToken] = React.useState(localStorage.getItem("token") || null);
    const [isAuthenticated, setIsAuisAuthenticated] = React.useState(localStorage.getItem("isAuthenticated") || false);

    const check = (token) => {
        return HexSchoolAuthProvider.check(
            token,
            (response) => {
                console.log(response);
                setIsAuisAuthenticated(true);
                localStorage.setItem("isAuthenticated", true);
            },
            (error) => {
                console.log(error);
                setIsAuisAuthenticated(false);
                localStorage.removeItem("isAuthenticated");
            }
        );
    };

    const signin = (newUser, successCallback, errorCallback) => {
        return HexSchoolAuthProvider.signin(
            newUser,
            (response) => {
                const _user = {
                    email: response.data.email,
                    nickname: response.data.nickname,
                };
                const _token = response.headers.authorization;
                setUser(_user);
                setToken(_token);
                setIsAuisAuthenticated(true);

                localStorage.setItem("user", JSON.stringify(_user));
                localStorage.setItem("token", _token);
                localStorage.setItem("isAuthenticated", true);

                successCallback(response.data);
            },
            (error) => {
                setUser(null);
                setToken(null);
                setIsAuisAuthenticated(false);

                localStorage.removeItem("user");
                localStorage.removeItem("token");
                localStorage.removeItem("isAuthenticated");

                errorCallback(error.response.data);
            }
        );
    };

    const signout = (callback) => {
        return HexSchoolAuthProvider.signout(token, (response) => {
            setUser(null);
            setToken(null);
            setIsAuisAuthenticated(false);

            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("isAuthenticated");

            callback(response.data);
        });
    };

    const register = (user, successCallback, errorCallback) => {
        return HexSchoolAuthProvider.register(
            user,
            (response) => {
                successCallback(response.data);
            },
            (error) => {
                errorCallback(error.response.data);
            }
        );
    };
    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated,
                check,
                signin,
                signout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

function RequireAuth({ children }) {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.isAuthenticated || !auth.token) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
}

export { AuthProvider, RequireAuth, useAuth };
