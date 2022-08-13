
function Input({ text, value, setValue, onClick }) {
    return (
        <>
            <input
                type="text"
                placeholder={text}
                value={value}
                onChange={(event) => {
                    setValue(event.target.value);
                }}
            />
            <a href="#" onClick={onClick}>
                <i className="fa fa-plus"></i>
            </a>
        </>
    );
}

export default Input;
