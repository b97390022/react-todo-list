import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "./auth";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoImg from "./images/footerLogo.png";
import workImg from "./images/workImg.png";
import { mySwal } from "./utils.js";

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "all",
        reValidateMode: "onChange",
        shouldFocusError: true,
    });
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    
    let from = location.state?.from?.pathname || "/todolist";

    async function onSubmit(data) {
        
        if (auth.token) {
            const checkResult = await auth.check(auth.token);
            if (checkResult) {
                navigate(from, { replace: true });
                return;
            };
        }

        auth.signin(data, (response) => {
            navigate(from, { replace: true });
            mySwal({
                title: response.message,
                timer: 2000,
            });
        }, (error)=>{
            mySwal({
                title: error.message,
            });
        });
    }
    
    return (
        // <!-- login_page -->
        <div id="loginPage" className="bg-yellow">
            <div className="conatiner loginPage vhContainer ">
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
                        <h2 className="formControls_txt">
                            最實用的線上代辦事項服務
                        </h2>
                        <label className="formControls_label" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="formControls_input"
                            id="email"
                            type="text"
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

                        <label className="formControls_label" htmlFor="pwd">
                            密碼
                        </label>
                        <input
                            className="formControls_input"
                            type="password"
                            id="password"
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
                        <button
                            className="formControls_btnSubmit"
                            type="submit"
                        >
                            登入
                        </button>
                        <Link className="formControls_btnLink" to="/register">
                            註冊帳號
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}