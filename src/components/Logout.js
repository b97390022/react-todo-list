import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth";
import { mySwal } from "../utils.js";
import { useFetchContext } from "./fetchContext";

export default function Logout() {
    const { isCheckBoxFetch, isDelete } = useFetchContext();
    const auth = useAuth();
    const navigate = useNavigate();

    return (

        <a
            href="/not-exist"
            onClick={(e) => {
                e.preventDefault();
                if (isCheckBoxFetch || isDelete ) {console.log(123);return}
                    auth.signout((response) => {
                        navigate("/");
                        mySwal({
                            title: response.message,
                            timer: 1500,
                        });
                    });
            }}
        >
            登出
        </a>

    );
}
