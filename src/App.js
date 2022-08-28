import React from "react";
import {
    Routes,
    Route,
    Outlet,
} from "react-router-dom";

import { RequireFetchContext } from "./components/fetchContext";
import { AuthProvider, RequireAuth } from "./auth";
//component
import NotFound from './components/NotFound'

//pages
import TodoListPage from "./TodoList"
import LoginPage from "./Login"
import RegisterPage from "./Register";

import "./App.css";

function Layout() {
    return (
        <>
            <header className="header"></header>
            <main className="content">
                <Outlet />
            </main>
            <footer className="footer"></footer>
        </>
    );
}

export default function App() {
    
    return (
        <AuthProvider>
            <main className="App">
                <RequireFetchContext>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route path="/" element={<LoginPage />} />
                            <Route
                                path="/register"
                                element={<RegisterPage />}
                            />
                            <Route
                                path="/todolist"
                                element={
                                    <RequireAuth>
                                        <TodoListPage />
                                    </RequireAuth>
                                }
                            ></Route>
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </RequireFetchContext>
            </main>
        </AuthProvider>
    );
}
