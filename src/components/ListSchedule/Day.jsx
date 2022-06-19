import { useState } from "react";
import Des from "./Des";
import clsx from 'clsx';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import IconHandle from "../IconHandle"


const Day = (props) => {
    const {
        schedule, title,
        numberOfDay,
        setListSchedule, listSchedule
    } = props;

    const classes = useStyles();
    const [showSchedule, setShowSchedule] = useState(false);

    const handleDeleteDay = () => {
        console.log(numberOfDay);
        let newSchedules = listSchedule.filter((item, index) => index !== numberOfDay);
        setListSchedule(newSchedules);
    }
    return (
        <div>
            <div className='flex items-center justify-between w-full bg-stone-300 rounded px-2'>
                <div className="flex items-center basis-2/3">
                    <span className='text-lg font-semibold'>
                        <span>Ngày</span>
                        <span className='mx-1'>{numberOfDay + 1}</span>
                        <span>:</span>
                    </span>
                    <input type="text" value={title} className={clsx('rounded p-3 bg-stone-300	w-full', classes.input)} />
                </div>
                <div>
                    {numberOfDay > 0 ?
                        <IconHandle type='delete' title='Xóa lịch trình hết trong ngày' visible={true} animation={false} onClick={handleDeleteDay} />
                        : null
                    }
                    {
                        showSchedule ?
                            <ExpandMoreIcon onClick={() => setShowSchedule(false)} style={{ fontSize: '15px' }} />
                            :
                            <ArrowForwardIosIcon onClick={() => setShowSchedule(true)} style={{ fontSize: '15px' }} />
                    }
                </div>
            </div>
            {
                showSchedule ?
                    schedule.map((itemSchedule, index) => {
                        return (
                            <Des
                                time={itemSchedule.time}
                                title={itemSchedule.title}
                                listDescription={itemSchedule.des}
                                numberOfDay={numberOfDay}
                                numberOfDes={index}
                                setListSchedule={setListSchedule}
                                listSchedule={listSchedule}
                                key={index}
                            />
                        )
                    })
                    : null
            }
        </div>
    )
}

export default Day;


const useStyles = makeStyles((theme) => ({
    input: {
        outline: 'none'
    },
}));