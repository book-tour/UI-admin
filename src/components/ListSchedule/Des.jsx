import { useState } from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconHandle from "../IconHandle"

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';
const Des = (props) => {
    const {
        time, title, listDescription,
        numberOfDay, numberOfDes,
        listSchedule, setListSchedule
    } = props
    const classes = useStyles();

    const [showListAction, setShowListAction] = useState(false);


    const handleCreateNewDes = () => {
        setListSchedule(listSchedule.map((day, indexDay) => {
            if (indexDay === numberOfDay) {
                return {
                    ...day,
                    schedule: day.schedule.map((des, indexDes) => {
                        if (indexDes === numberOfDes) {
                            return {
                                ...des,
                                des: [...des.des, '']
                            }
                        }
                        return des
                    })
                }
            }
            return day;
        }))
    }
    const handleDeleteDes = () => {
        setListSchedule(listSchedule.map((day, indexDay) => {
            if (indexDay === numberOfDay) {
                return {
                    ...day,
                    schedule: day.schedule.map((des, indexDes) => {
                        if (indexDes === numberOfDes) {
                            if (des.des.length > 1)
                                return {
                                    ...des,
                                    des: des.des.filter((item, index) => index < des.des.length - 1)
                                }
                            else {
                                swal("Không thể xóa", "Phải có ít nhất 1 hoạt động trong ngày", "error");
                                return {
                                    ...des,
                                }
                            }
                        }
                        return des
                    })
                }
            }
            return day;
        }))
    }
    return (
        <div className=''>
            <div className='flex items-center w-full bg-stone-200 px-2'>
                <label htmlFor="" className='font-semibold text-lg'>{time}:</label>
                <input type="text" value={title} className={clsx(' rounded p-2 bg-stone-200 w-full', classes.input)} />
                <IconHandle type='create' title='Thêm hoạt động mới' animation={false} onClick={handleCreateNewDes} />
                <IconHandle type='delete' title='Xóa hoạt động' visible={true} animation={false} onClick={handleDeleteDes} />
                {
                    showListAction ?
                        <ExpandMoreIcon onClick={() => setShowListAction(false)} style={{ fontSize: '15px' }} />
                        :
                        <ArrowForwardIosIcon onClick={() => setShowListAction(true)} style={{ fontSize: '15px' }} />
                }
            </div>
            {
                showListAction ?
                    listDescription.map((itemDes, index) => {
                        return (
                            <div className=''>
                                <textarea name="" id="" cols="30" rows="5" className={clsx('w-full bg-stone-100 px-2', classes.input)}>{itemDes}</textarea>
                            </div>
                        )
                    })
                    : null
            }
        </div>
    )
}

export default Des;


const useStyles = makeStyles((theme) => ({
    input: {
        outline: 'none'
    },
}));