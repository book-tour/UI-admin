


const Textarea = (props) => {
    const { placeholder, disabled, label, type, value, onChange, title } = props;

    return (
        <div >
            {label &&
                <p className="text-lg font-semibold my-0 mx-1">{label} :</p>
            }
            <textarea
                type={type}
                className="border-2 rounded-xl px-1 py-2 w-full "
                rows={10}
                placeholder={placeholder}
                disabled={disabled || false}
                value={value}
                onChange={onChange}
                title={title}
            />
        </div>
    )
}

export default Textarea;