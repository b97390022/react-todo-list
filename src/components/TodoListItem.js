function TodoListItem({ item: { id, text, checked }, onChecked, onDelete }) {
    return (
        <li>
            <label className="todoList_label">
                <input
                    className="todoList_input"
                    type="checkbox"
                    value="true"
                    checked={checked}
                    onChange={(event) => {
                        onChecked(id, event.target.checked);
                    }}
                />
                <span>{text}</span>
            </label>
            <a
                href="#"
                onClick={(event) => {
                    event.preventDefault();
                    onDelete(id);
                }}
            >
                <i className="fa fa-times"></i>
            </a>
        </li>
    );
}

export default TodoListItem;