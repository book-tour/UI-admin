



const Select = props => {
    const { label,value,onChange,options,disabled,title} = props;

    return (
        <div>
            <p className="text-lg font-semibold my-0 mx-1">{label} :</p>
            <select
                className="border-2 rounded-xl px-1 py-2"
                value={value}
                onChange={onChange}
                disabled={disabled||false}
                title={title}
            >
                {options.map(option => (
                    <option key={option.codename} value={option.name}>{option.name}</option>
                ))}
            </select>
        </div>
    )
}

export default Select;