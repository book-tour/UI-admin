import React, { useState, useEffect, useMemo } from 'react'
import ExtendFunction from '../../utils/extendFunction';
import TugoContext from '../../contexts/tugo.context';

import moment from 'moment';

const ItemNearestTour = ({ props }) => {
    const { item } = props;
    const tugo = new TugoContext();
    const extendFunc = new ExtendFunction();
    
    const depart_date = useMemo(() => new Date(item.depart_date), [item])
    const [time, setTime] = useState(extendFunc.timeBetween(new Date(), depart_date))

    const [price, setPrice] = useState(0)

    useEffect(() => {
        // const countDown = setInterval(() => {
        //     setTime(extendFunc.timeBetween(new Date(), depart_date))
        // }, 1000)

        // return () => {
        //     clearInterval(countDown)
        // }
        console.log(item);
    }, [])

    return (
        <div className='bg-white rounded-2xl w-[250px] min-w-[250px] px-2 py-3 mx-2'>
            <img src={item.thumbnail} alt="" className='w-full h-[150px] rounded-xl' />
            <p
                title={item.title}
                className=' text-black text-xl font-semibold m-0'
            >{extendFunc.cutString(item.title)}</p>
            <p className='text-slate-400 italic	m-0	'>{item.position} - {item.destination}</p>
            <hr className='m-1' />
            <div className=''>
                <div className=''>
                    <p className='font-bold text-slate-400 m-0'>Giá tiền</p>
                    <p className='font-bold m-0'>{new Intl.NumberFormat('de-DE').format(item.money)} vnd</p>
                </div>
                <div className=''>
                    <p className='font-bold text-slate-400 m-0'>Ngày bắt đầu</p>
                    <p>{moment(item.depart_date).utc().format('MM/DD/YYYY')}</p>
                </div>
            </div>
        </div>
    )
}
export default ItemNearestTour