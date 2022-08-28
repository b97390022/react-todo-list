import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth";
import { mySwal } from "../utils.js";

export default function Logout() {
    let auth = useAuth();
    let navigate = useNavigate();

    return (

        <a
            href="/not-exist"
            onClick={(e) => {
                e.preventDefault();
                auth.signout((response) => {
                    navigate("/");
                    mySwal({
                        title: response.message,
                        timer: 2000,
                    });
                });
            }}
        >
            登出
        </a>

    );
}
