import React, { useEffect, useState } from 'react';
import TugoContext from '../contexts/tugo.context';

import TableTours from '../components/Table/TableTours';
import TableSchedules from '../components/Table/TableSchedules';

const Tour = () => {
    const tugo = new TugoContext();
    const [listTours, setListTours] = useState([]);


    useEffect(async () => {
        let tours = (await tugo.getTours()).data
        let format = tours.map(item => {
            
            return {
                ...item,
                length: `${item.length.day} ngày ${item.length.night} đêm`
            }
        })

        console.log({ tours });
        setListTours(format);
    }, [])
    return (
        <div className="p-3">
            <TableTours listTours={listTours}/>
            <TableSchedules listTours={listTours}/>
        </div>
    )
}
export default Tour;



