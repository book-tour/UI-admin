



const Input = props => {
    const { placeholder, disabled, label, type, value, onChange, title ,readOnly} = props;

    return (
        <div>
            <p className="text-lg font-semibold my-0 mx-1">{label} :</p>
            <input
                type={type}
                className="border-2 rounded-xl px-1 py-2 mr-5"
                placeholder={placeholder}
                disabled={disabled || false}
                readOnly={disabled || false}
                value={value}
                onChange={onChange}
                title={title}
            />
        </div>
    )
}

export default Input;