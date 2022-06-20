import { useState } from "react"
import clsx from "clsx"
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


const ListThumbnail = (props) => {
    const {
        listThumbnail, setListThumbnail,
    } = props
    const handleDeleteThumbnail = (index) => {

    }
    return (
        <div className='flex items-center flex-wrap gap-5'>
            {listThumbnail?.length && listThumbnail.length > 0 ?
                listThumbnail.map(thumbnail => {
                    return (
                        <div className="w-[250px] h-[200px] relative">
                            <img
                                src={thumbnail}
                                alt=""
                                className={clsx('w-full h-full rounded ')}
                                title='Click to remove'
                            // onClick={() => setThumbnail('')}
                            />
                            <HighlightOffIcon
                                className="top-[-15px] absolute right-[-15px] bg-white text-red-400 hover:text-red-500 cursor-pointer rounded-full"
                                style={{ fontSize: '35px' }}
                                titleAccess='Nhấn để xóa'
                                onClick={handleDeleteThumbnail}
                            />
                        </div>
                    )
                })
                : null
            }
        </div>
    )
}

export default ListThumbnail;