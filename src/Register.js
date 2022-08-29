
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import logoImg from "./images/footerLogo.png";
import workImg from "./images/workImg.png";
import { mySwal } from './utils.js'

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        mode: "all",
        reValidateMode: "onChange",
        shouldFocusError: true,
    });
    
    const auth = useAuth();
    let navigate = useNavigate();

    async function onSubmit(data) {
        const { email, name: nickname, password } = data;
 
        auth.register(
            { email, nickname, password },
            (response) => {
                //註冊成功，導向登入頁面登入
                navigate("/");
                mySwal({
                    title: `${response.message}，請重新登入。`,
                    timer: 1500,
                });

            },
            (error) => {
                //註冊出現錯誤，提示使用者訊息
                mySwal({
                    title: error.message,
                    text: error.error.toString(),
                    timer: 1500,
                });
            }
        );
    };
    return (
        <div id="signUpPage" className="bg-yellow">
            <div className="conatiner signUpPage vhContainer">
                <div className="side">
                    <a
                        href="/not-exist"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <img className="logoImg" src={logoImg} alt="" />
                    </a>
                    <img className="d-m-n" src={workImg} alt="workImg" />
                </div>
                <div>
                    <form
                        className="formControls"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <h2 className="formControls_txt">註冊帳號</h2>
                        <label className="formControls_label" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="formControls_input"
                            type="text"
                            id="email"
                            autoComplete="off"
                            placeholder="請輸入 email"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "請輸入email!",
                                },
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "格式有誤!",
                                },
                            })}
                        />
                        {errors.email?.message ? (
                            <span id="emailnote">
                                <FontAwesomeIcon icon={faInfoCircle} />
                                &nbsp;{errors.email?.message}
                            </span>
                        ) : undefined}
                        <label className="formControls_label" htmlFor="name">
                            您的暱稱
                        </label>
                        <input
                            className="formControls_input"
                            type="text"
                            id="name"
                            placeholder="請輸入您的暱稱"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "請輸入您的暱稱!",
                                },
                            })}
                        />
                        {errors.name?.message ? (
                            <span id="namenote">
                                <FontAwesomeIcon icon={faInfoCircle} />
                                &nbsp;{errors.name?.message}
                            </span>
                        ) : undefined}
                        <label className="formControls_label" htmlFor="pwd">
                            密碼
                        </label>
                        <input
                            className="formControls_input"
                            type="password"
                            id="pwd"
                            placeholder="請輸入密碼"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "請輸入密碼!",
                                },
                                minLength: {
                                    value: 6,
                                    message: "密碼長度至少6位字元",
                                },
                            })}
                        />
                        {errors.password?.message ? (
                            <span id="passwordnote">
                                <FontAwesomeIcon icon={faInfoCircle} />
                                &nbsp;{errors.password?.message}
                            </span>
                        ) : undefined}
                        <label className="formControls_label" htmlFor="pwd">
                            再次輸入密碼
                        </label>
                        <input
                            className="formControls_input"
                            type="password"
                            id="pwdcheck"
                            placeholder="請再次輸入密碼"
                            {...register("pwdcheck", {
                                required: {
                                    value: true,
                                    message: "請再次輸入密碼!",
                                },
                                validate: (val) => {
                                    if (watch("password") !== val) {
                                        return "兩次密碼不相同!";
                                    }
                                },
                            })}
                        />
                        {errors.pwdcheck?.message ? (
                            <span id="pwdchecknote">
                                <FontAwesomeIcon icon={faInfoCircle} />
                                &nbsp;{errors.pwdcheck?.message}
                            </span>
                        ) : undefined}
                        <button
                            className="formControls_btnSubmit"
                            type="submit"
                        >
                            註冊帳號
                        </button>

                        <Link className="formControls_btnLink" to="/">
                            登入
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}