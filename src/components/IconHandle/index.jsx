

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import clsx from 'clsx';

const IconHandle = (props) => {
    const {
        children,
        className,
        disabled,
        onClick,
        type,
        visible,
        ...rest
    } = props;
    if (type == 'edit') {
        return (
            <EditIcon
                className={
                    clsx(
                        'mr-3 cursor-pointer rounded-full p-1 	 hover:bg-gray-300 block  ',
                        className,
                        {
                            'pointer-events-none text-slate-300': !visible,
                            'pointer-events-auto animate-bounce text-orange-300': visible,
                        }
                    )
                }
                style={{ fontSize: '35px' }}
                onClick={onClick}
            />
        )
    }
    else if (type == 'delete') {
        return (
            <DeleteIcon
                className={
                    clsx(
                        'mr-3 cursor-pointer rounded-full p-1 	 hover:bg-gray-300 block  ',
                        className,
                        {
                            'pointer-events-none text-slate-300': !visible,
                            'pointer-events-auto animate-bounce text-rose-700': visible,
                        }
                    )
                }
                style={{ fontSize: '35px' }}
                onClick={onClick}
            />
        )
    }
    else if (type == 'create') {
        return (
            <AddCircleOutlineIcon
                className={
                    clsx(
                        'mr-3 cursor-pointer rounded-full p-1 animate-bounce text-green-600 	 hover:bg-gray-300 block  ',
                        className
                    )
                }
                style={{ fontSize: '35px' }}
                onClick={onClick}
            />
        )
    }
}

export default IconHandle;