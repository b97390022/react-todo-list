
function TodoListToggle({
    todo,
    tab,
    onChecked,
    onDelete,
    completedItems,
    deleteCompletedItems,
    TodoListItem
}) {
    let todoArray = [...todo];

    if (tab === "待完成") {
        todoArray = todoArray.filter((item) => item.checked === false);
    } else if (tab === "已完成") {
        todoArray = todoArray.filter((item) => item.checked === true);
    }

    return (
        <>
            <ul className="todoList_item">
                {todoArray.map((item, index) => {
                    return (
                        <TodoListItem
                            item={item}
                            key={index}
                            onChecked={onChecked}
                            onDelete={onDelete}
                        />
                    );
                })}
            </ul>
            <div className="todoList_statistics">
                <p> {completedItems} 個已完成項目</p>
                <a href="#" onClick={deleteCompletedItems}>
                    清除已完成項目
                </a>
            </div>
        </>
    );
}

export default TodoListToggle;
