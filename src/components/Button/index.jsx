import clsx from "clsx";

const Button = props => {
    const {
        children,
        className,
        disabled,
        onClick,
        type,
        ...rest
    } = props;
   
    return (
        <button
            className={clsx(className,typeBtn.find(item => item.type == type).class)}
            disabled={disabled}
            onClick={onClick}
            type={type}
            {...rest}
        >
            {children}
        </button>
    )
}
export default Button;

const typeBtn = [
    {
        type:'submit',
        class:'bg-[#008af7] border-[#008af7] border-2 rounded-xl text-white p-2 m-1 hover:opacity-75'
    },
    {
        type:'cancel',
        class:'border-[#008af7] border-2 rounded-xl text-black p-2 m-1 font-semibold hover:opacity-75'
    }
]