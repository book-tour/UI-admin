import React, { useState, useEffect, useMemo } from 'react'
import ExtendFunction from '../../utils/extendFunction';




const ItemNearestTour = ({ props }) => {
    const { item } = props;
    const extendFunc = new ExtendFunction();
    
    const depart_date = useMemo(() => new Date(item.depart_date), [item])
    const [time, setTime] = useState(extendFunc.timeBetween(new Date(), depart_date))


    useEffect(() => {
        const countDown = setInterval(() => {
            setTime(extendFunc.timeBetween(new Date(), depart_date))
        }, 1000)

        return () => {
            clearInterval(countDown)
        }
    }, [depart_date])

    return (
        <div className='bg-white rounded-2xl w-[250px] min-w-[250px] px-2 py-3 mx-2'>
            <img src={item.thumbnail} alt="" className='w-full h-[150px] rounded-xl' />
            <p
                title={item.title}
                className=' text-black text-xl font-semibold m-0'
            >{extendFunc.cutString(item.title)}</p>
            <p className='text-slate-400 italic	m-0	'>{item.position} - {item.destination}</p>
            <hr className='m-1' />
            <div className='flex items-center'>
                <div className='flex flex-col justify-end'>
                    <p className='font-bold text-slate-400 m-0'>Gia tien</p>
                    <p className='font-bold'>{item.money} vnd</p>
                </div>
                <div className='flex flex-col justify-end'>
                    <p className='font-bold text-slate-400 m-0'>con lai</p>
                    <p>{time.resultString}</p>
                </div>
            </div>
        </div>
    )
}
export default ItemNearestTour