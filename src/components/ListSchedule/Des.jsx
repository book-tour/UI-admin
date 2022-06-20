import { useState } from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconHandle from "../IconHandle"

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';
import ItemDes from './ItemDes';

const Des = (props) => {
    const {
        time, title, listDescription,
        numberOfDay, numberOfDes,
        listSchedule, setListSchedule
    } = props
    const classes = useStyles();

    const [showListAction, setShowListAction] = useState(false);
    const [titleDesInput, setTitleDesInput] = useState(title);

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
        swal({
            title: `Bạn có chắc chắn muốn xóa hoạt động này chứ?`,
            text: "Sau khi xóa, muốn khôi phục hãy reload lại trang",
            icon: "warning",
        })
            .then((willDelete) => {
                if (willDelete) {
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
            })
    }

    const handleChangeTitleDes = (e) => {
        setTitleDesInput(e.target.value);

        let newSchedule = listSchedule.map((day, indexDay) => {
            if (indexDay === numberOfDay) {
                return {
                    ...day,
                    schedule: day.schedule.map((des, indexDes) => {
                        if (indexDes === numberOfDes) {
                            console.log(`Thay đổi title của ngày ${numberOfDay + 1} time ${numberOfDes == 0 ? 'Sáng' : 'Chiều'}: ${e.target.value}`);
                            return {
                                ...des,
                                title: e.target.value
                            }
                        }
                        return des
                    })
                }
            }
            return day;
        })
        setListSchedule(newSchedule);
    }
   
    return (
        <div className=''>
            <div className='flex items-center w-full bg-stone-200 px-2'>
                <label htmlFor="" className='font-semibold text-lg'>{time}:</label>
                <input
                    type="text"
                    value={titleDesInput}
                    onChange={handleChangeTitleDes}
                    className={clsx(' rounded p-2 bg-stone-200 w-full', classes.input)}
                />
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
                            <div className='' key={index}>
                                <ItemDes
                                    setListSchedule={setListSchedule}
                                    listSchedule={listSchedule}
                                    numberOfDay={numberOfDay}
                                    numberOfDes={numberOfDes}
                                    numberOfItemDes={index}
                                    value = {itemDes}
                                />
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