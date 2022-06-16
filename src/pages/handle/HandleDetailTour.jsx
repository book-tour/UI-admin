import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import TugoContext from '../../contexts/tugo.context';

import Input from '../../components/Form/Input';
import Textarea from '../../components/Form/Textarea';
import Select from '../../components/Form/Select';
import Button from '../../components/Button'

import clsx from 'clsx';

const HandleDetailTour = ({ idTour, tours }) => {
    const tugo = new TugoContext();

    const [id, setId] = useState(0);
    const [description, setDescription] = useState('');
    const [listThumbnail, setListThumbnail] = useState([]);
    const [schedule, setSchedule] = useState([]);

    useEffect(async () => {
        console.log(idTour);
        if (idTour) {
            let info = (await tugo.getDetailTours(idTour)).data
            console.log(info);

            setId(info.id);
            setDescription(info.description);
            setListThumbnail(info.listThumbnail);
            setSchedule(info.schedule);
        }
    }, [])

    return (
        <div className='bg-white p-3 rounded-xl'>
            <div>
                <p className='font-bold text-2xl'>Info Detail Tour</p>
                <hr />
            </div>
            <div className='flex items-center flex-wrap'>
                {listThumbnail?.length && listThumbnail.length > 0 ?
                    listThumbnail.map(thumbnail => {
                        return (
                            <img
                                src={thumbnail}
                                alt=""
                                className={clsx('w-[250px] h-[200px] rounded-xl hover:blur-sm mx-3')}
                                title='Click to remove'
                            // onClick={() => setThumbnail('')}
                            />
                        )
                    })
                    : null
                }
            </div>
        </div>
    )
}

export default HandleDetailTour;