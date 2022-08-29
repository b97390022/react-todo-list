import { useState, useEffect, useCallback, useMemo } from "react";

import Input from "./components/Input.js";
import TodoListEmpty from "./components/TodoListEmpty.js";
import TodoListToggle from "./components/TodoListToggle.js";
import TodoListItem from "./components/TodoListItem.js";
import Logout from "./components/Logout.js";
import { useAuth } from "./auth.js";
import { useFetchContext } from "./components/fetchContext";
import { useTodoProvider } from "./fetch.js";
import { mySwal } from "./utils.js";

const defaultTab = ["全部", "待完成", "已完成"];

export default function TodoListPage() {
    const auth = useAuth();
    const HexSchoolTodoProvider = useTodoProvider();
    const [inputValue, setInputValue] = useState("");
    const [nowTab, setNowTab] = useState("全部");
    const [todoList, setTodoList] = useState([]);
    const { checkBoxs, setCheckBoxs, deletes, setDeletes, isCheckBoxFetch } =
        useFetchContext();

    // 更新現有todolist
    useEffect(() => {
        HexSchoolTodoProvider.getTodo(auth.token, (response) => {
            setTodoList(response.data.todos);
        });
    }, [auth.token, HexSchoolTodoProvider, setTodoList]);

    // 更新待完成項目總數
    const NotCompletedItems = useMemo(() => {
        return todoList.filter((item) => !item.completed_at).length;
    }, [todoList]);

    // 更新已完成項目列表
    const completedItems = useMemo(() => {
        return todoList.filter((item) => item.completed_at);
    }, [todoList]);

    // 更新Todo Item Checkbox
    const setTodoItemState = useCallback(
        (id) => {
            // 如果仍在更改checkbox，阻止使用者行為
            if (checkBoxs.includes(id)) {
                return;
            }
            // 如果仍在刪除，阻止使用者行為
            if (deletes.includes(id)) {
                return;
            }
            setCheckBoxs((prev) => [...prev, id]);

            HexSchoolTodoProvider.toggleTodo({
                token: auth.token,
                id: id,
                successCallback: (response) => {
                    setTodoList((prev) => {
                        return prev.map((item) => {
                            return item.id === id
                                ? {
                                      ...item,
                                      completed_at: response.data.completed_at,
                                  }
                                : item;
                        });
                    });
                },
                finallyCallback: () => {
                    setCheckBoxs((prev) => prev.filter((el) => el !== id));
                },
            });
        },
        [HexSchoolTodoProvider, auth.token, checkBoxs, setCheckBoxs, deletes]
    );

    // 刪除單一個Todo Item
    const deleteTodoItem = useCallback(
        (id) => {
            // 如果仍在更改checkbox，阻止使用者行為
            if (checkBoxs.includes(id)) {
                return;
            }
            // 如果仍在刪除，阻止使用者行為
            if (deletes.includes(id)) {
                return;
            }
            setDeletes((prev) => [...prev, id]);

            HexSchoolTodoProvider.deleteTodo({
                token: auth.token,
                id: id,
                successCallback: (response) => {
                    setTodoList((prev) => {
                        return prev.filter((item) => item.id !== id);
                    });
                },
                finallyCallback: () => {
                    setDeletes((prev) => prev.filter((el) => el !== id));
                },
            });
        },
        [HexSchoolTodoProvider, auth.token, deletes, setDeletes, checkBoxs]
    );

    // 刪除所有已完成項目
    const deleteCompletedItems = useCallback(
        (event) => {
            event.preventDefault();
            // 如果仍在更改checkbox，阻止使用者行為
            if (isCheckBoxFetch) return;
            const needToDeletes = completedItems.map((item) => item.id);
            setDeletes((prev) => {
                const toDeletes = needToDeletes.filter(
                    (item) => !prev.includes(item)
                );
                return [...prev, ...toDeletes];
            });

            needToDeletes.forEach((element) => {
                if (!deletes.includes(element)) {
                    HexSchoolTodoProvider.deleteTodo({
                        token: auth.token,
                        id: element,
                        successCallback: (response) => {
                            setTodoList((prev) => {
                                return prev.filter(
                                    (item) => item.id !== element
                                );
                            });
                        },
                        finallyCallback: () => {
                            setDeletes((prev) =>
                                prev.filter((el) => el !== element)
                            );
                        },
                    });
                }
            });
        },
        [
            HexSchoolTodoProvider,
            auth.token,
            setTodoList,
            deletes,
            setDeletes,
            completedItems,
            isCheckBoxFetch,
        ]
    );

    // 新增Todo Item
    const addTodoItem = useCallback(
        (event) => {
            event.preventDefault();
            if (/^$|^\s*$/.test(inputValue)) return;
            HexSchoolTodoProvider.addTodo({
                token: auth.token,
                todo: {
                    todo: {
                        content: inputValue,
                    },
                },
                successCallback: (response) => {
                    setTodoList((prev) => {
                        return [...prev, response.data];
                    });
                },
                errorCallback: (error) => {
                    mySwal({
                        title: error.message,
                        timer: 1000,
                    });
                },
            });
            setInputValue("");
        },
        [inputValue, HexSchoolTodoProvider, auth.token, setTodoList]
    );

    // 處理Input KeyDown Event
    function handleInputKeyDown(event) {
        if (event.key === "Enter") {
            addTodoItem(event);
        }
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
                <h1>
                    <a
                        href="/not-exist"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        ONLINE TODO LIST
                    </a>
                </h1>
                <ul>
                    <li className="todo_sm">
                        <a
                            href="/not-exist"
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <span> {`${auth.user.nickname}的代辦`} </span>
                        </a>
                    </li>
                    <li>
                        <Logout />
                    </li>
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
                                            href="/not-exist"
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
                                    NotCompletedItems={NotCompletedItems}
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