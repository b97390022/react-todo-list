import Input from './components/Input.js'
import TodoListEmpty from './components/TodoListEmpty.js';
import TodoListToggle from './components/TodoListToggle.js';
import TodoListItem from "./components/TodoListItem.js";

import './App.css';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";


const defaultTab = ["全部", "待完成", "已完成"];

function App() {
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
                <h1>
                    <a href="#">ONLINE TODO LIST</a>
                </h1>
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

export default App;