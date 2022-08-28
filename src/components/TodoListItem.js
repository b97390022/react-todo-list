export default function TodoListItem({ item: { id, content, completed_at }, onChecked, onDelete }) {
    return (
        <li>
            <label className="todoList_label">
                <input
                    className="todoList_input"
                    type="checkbox"
                    value="true"
                    checked={completed_at ? true : false}
                    onChange={(event) => {onChecked(id)}}
                />
                <span>{content}</span>
            </label>
            <a
                href="/not-exist"
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
