import { useState } from 'react';


import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';

const ItemDes = (props) => {
    const {
        listSchedule, setListSchedule,
        numberOfDay, numberOfDes, numberOfItemDes,
        value
    } = props
    const classes = useStyles();
    const [descriptionInput, setDescriptionInput] = useState(value);

    const handleChangeDescription = (e, index) => {
        setDescriptionInput(e.target.value);

        let newSchedule = listSchedule.map((day, indexDay) => {
            if (indexDay === numberOfDay) {
                return {
                    ...day,
                    schedule: day.schedule.map((des, indexDes) => {
                        if (indexDes === numberOfDes) {
                            let newDes = des.des.map((item, index) => {
                                if (index === numberOfItemDes) {
                                    return e.target.value;
                                }
                                return item;
                            })
                            console.log(`thay đổi des ${indexDes} của ngày ${numberOfDay + 1} : `, newDes);
                            return {
                                ...des,
                                des: newDes
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
        <>
            <textarea value={descriptionInput} onChange={e => handleChangeDescription(e, numberOfItemDes)} name="" id="" rows="5" className={clsx('w-full bg-stone-100 px-2', classes.input)} />
        </>
    )
}

export default ItemDes;


const useStyles = makeStyles((theme) => ({
    input: {
        outline: 'none'
    },
}));