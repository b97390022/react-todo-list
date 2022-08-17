
import "./App.css";
import logoImg from "./footerLogo.png";
import workImg from "./workImg.png";

import { useState, useEffect } from "react";
import { Routes, Route, Link, Outlet, useNavigate, Navigate  } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Input from "./components/Input.js";
import TodoListEmpty from "./components/TodoListEmpty.js";
import TodoListToggle from "./components/TodoListToggle.js";
import TodoListItem from "./components/TodoListItem.js";

const defaultTab = ["全部", "待完成", "已完成"];

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

function Login() {
    let navigate = useNavigate();
    return (
        // <!-- login_page -->
        <div id="loginPage" className="bg-yellow">
            <div className="conatiner loginPage vhContainer ">
                <div className="side">
                    <a href="#">
                        <img className="logoImg" src={logoImg} alt="" />
                    </a>
                    <img className="d-m-n" src={workImg} alt="workImg" />
                </div>
                <div>
                    <form className="formControls" action="index.html">
                        <h2 className="formControls_txt">
                            最實用的線上代辦事項服務
                        </h2>
                        <label className="formControls_label" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="formControls_input"
                            type="text"
                            id="email"
                            name="email"
                            placeholder="請輸入 email"
                            required
                        />
                        <span>此欄位不可留空</span>
                        <label className="formControls_label" htmlFor="pwd">
                            密碼
                        </label>
                        <input
                            className="formControls_input"
                            type="password"
                            name="pwd"
                            id="pwd"
                            placeholder="請輸入密碼"
                            required
                        />
                        <input
                            className="formControls_btnSubmit"
                            type="button"
                            onClick={(e) => {
                                navigate("/todolist");
                            }}
                            value="登入"
                        />
                        <Link className="formControls_btnLink" to="/register">
                            註冊帳號
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

function Register() {
    let navigate = useNavigate();
    return (
        <div id="signUpPage" className="bg-yellow">
            <div className="conatiner signUpPage vhContainer">
                <div className="side">
                    <a href="#"><img className="logoImg" src={logoImg} alt=""/></a>
                    <img className="d-m-n" src={workImg} alt="workImg"/>
                </div>
                <div>
                    <form className="formControls" action="index.html">
                        <h2 className="formControls_txt">註冊帳號</h2>
                        <label className="formControls_label" htmlFor="email">Email</label>
                        <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required/>
                        <label className="formControls_label" htmlFor="name">您的暱稱</label>
                        <input className="formControls_input" type="text" name="name" id="name" placeholder="請輸入您的暱稱"/>
                        <label className="formControls_label" htmlFor="pwd">密碼</label>
                        <input className="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" required/>
                        <label className="formControls_label" htmlFor="pwd">再次輸入密碼</label>
                        <input className="formControls_input" type="password" name="pwd" id="pwd" placeholder="請再次輸入密碼" required/>
                        <input className="formControls_btnSubmit" type="button" onClick={(e)=>{navigate("/todolist");}} value="註冊帳號"/>
                        <Link className="formControls_btnLink" to="/">登入</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

function NotFound() {
    return (
        <>
            <h2>您的網址出錯嘍~</h2>
            <Link to="/">回到首頁</Link>
        </>
    );
}

function TodoList() {

    let completedItems = 0;
    const [inputValue, setInputValue] = useState("");
    const [nowTab, setNowTab] = useState("全部");
    const [todoList, setTodoList] = useState(() => {
        const savedTodoList = JSON.parse(localStorage.getItem("todoList"));
        return savedTodoList || [];
    });

    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }, [todoList]);

    // 更新已完成項目
    for (let index = 0; index < todoList.length; index++) {
        const element = todoList[index];
        if (element.checked) completedItems = completedItems + 1;
    }

    // 刪除所有已完成項目
    function deleteCompletedItems(event) {
        event.preventDefault();
        setTodoList(todoList.filter((item) => item.checked === false));
    }

    // 處理Input KeyDown Event
    function handleInputKeyDown(event) {
        if (event.key === "Enter") {
            addTodoItem(event);
        }
    }

    // 新增Todo Item
    function addTodoItem(event) {
        event.preventDefault();
        if (inputValue !== "")
            setTodoList([
                ...todoList,
                {
                    id: uuidv4(),
                    text: inputValue,
                    checked: false,
                },
            ]);
        setInputValue("");
    }

    // 更新Todo Item Checkbox
    function setTodoItemState(id, state) {
        setTodoList(
            todoList.map((item) => {
                return item.id === id ? { ...item, checked: state } : item;
            })
        );
    }

    // 刪除單一個Todo Item
    function deleteTodoItem(id) {
        setTodoList(todoList.filter((item) => item.id !== id));
    }

    // 分頁切換
    function handleTabToggle(event) {
        event.preventDefault();
        const nowText = event.target.innerText;
        // 修改nowTab
        if (nowTab !== nowText) setNowTab(nowText);
    }


    return (
        <div id="todoListPage" className="bg-half">
        <nav>
            <h1><a href="#">ONLINE TODO LIST</a></h1>
            <ul>
                <li className="todo_sm"><a href="#"><span>王小明的代辦</span></a></li>
                <li><Link className="formControls_btnLink" to="/">登出</Link></li>
            </ul>
        </nav>
            <div className="conatiner todoListPage vhContainer">
                <div className="todoList_Content">
                    <div className="inputBox">
                        <Input
                            text="請輸入待辦事項"
                            value={inputValue}
                            setValue={setInputValue}
                            onClick={addTodoItem}
                            onKeyDown={handleInputKeyDown}
                        />
                    </div>
                    <div className="todoList_list">
                        <ul className="todoList_tab">
                            {defaultTab.map((text, index) => {
                                return (
                                    <li key={index}>
                                        <a
                                            href="#"
                                            className={
                                                nowTab === text ? "active" : ""
                                            }
                                            onClick={handleTabToggle}
                                        >
                                            {text}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="todoList_items">
                            {todoList.length > 0 ? (
                                <TodoListToggle
                                    todo={todoList}
                                    tab={nowTab}
                                    onChecked={setTodoItemState}
                                    onDelete={deleteTodoItem}
                                    completedItems={completedItems}
                                    deleteCompletedItems={deleteCompletedItems}
                                    TodoListItem={TodoListItem}
                                />
                            ) : (
                                <TodoListEmpty />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={ isAuthenticated ? <Navigate to="/todolist" /> : <Login />} />
                    <Route path="/register" element={<Register />}/>
                    <Route path="/todolist" element={<TodoList />}/>
                    <Route path="*" element={<NotFound />}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
