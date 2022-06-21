import { useState } from "react";
import Day from "./Day"


import clsx from 'clsx';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';


const ListSchedule = (props) => {
    const { setListSchedule,listSchedule } = props

    return (
        <div>
            {listSchedule.map((schedule, index) => {
                return (
                    <>
                        <Day schedule={schedule.schedule} title={schedule.title} numberOfDay={index} key={index} setListSchedule={setListSchedule} listSchedule={listSchedule}/>
                    </>
                )
            })}
        </div>
    )
}

export default ListSchedule;


