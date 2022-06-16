import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import TugoContext from '../../contexts/tugo.context';

import Input from '../../components/Form/Input';
import Textarea from '../../components/Form/Textarea';
import Select from '../../components/Form/Select';
import Button from '../../components/Button'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import swal from 'sweetalert';
import clsx from 'clsx';
import ExtendFunction from '../../utils/extendFunction';
import HandleDetailTour from './HandleDetailTour';


const HandleTour = () => {
    const tugo = new TugoContext();
    const extendFunc = new ExtendFunction();
    const query = useQuery();
    const navigate = useNavigate();
    const [listDestinations, setListDestinations] = useState([]);


    const [id, setId] = useState(0);
    const [idDestination, setIdDestination] = useState(0);
    const [position, setPosition] = useState('Hồ Chí Minh');
    const [destination, setDestination] = useState('');
    const [day, setDay] = useState(0);
    const [night, setNight] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [fileImage, setFileImage] = useState('');


    const handleSubmit = async () => {
        let data = {
            id,
            position,
            destination,
            length: JSON.stringify({ day, night }),
            discount,
            title,
            thumbnail,
            id_destination: idDestination
        }
        // check base64
        let list = []
        if (thumbnail.indexOf('data:image') !== -1) {
            let i = new Promise((resolve, reject) => {
                resolve(extendFunc.processFile(fileImage, list, `tour/${id}`))
            });
            i.then(async res => {
                console.log(res, list)
            })
        }
        if (list.length > 0)
            data = {
                ...data,
                thumbnail: list[0]
            }
        if (query.get('idTour')) {
            tugo.updateTour(query.get('idTour'), data)
                .then(() => {
                    swal('Thành công', 'Cập nhật thành công', 'success');
                    navigate('/tour');
                })
                .catch(err => {
                    swal('Thất bại', 'Cập nhật thất bại', 'error');
                })
        }
        else {
            tugo.createTour(data)
                .then(() => {
                    swal('Thành công', 'Tạo mới thành công', 'success');
                    navigate('/tour');
                })
                .catch(err => {
                    swal('Thất bại', 'Tạo mới thất bại', 'error');
                })
        }
    }
    const handleCancel = () => {
        navigate('/tour');
    }
    const handleAddImage = (e) => {
        const file = e.target.files[0]
        setFileImage(
            file
        )

        var reader = new FileReader();
        reader.onloadend = function () {
            // console.log(reader.result)
            setThumbnail(reader.result)

        }
        reader.readAsDataURL(file);

        file.preview = URL.createObjectURL(file)
    }
    useEffect(async () => {
        let tours = await tugo.getTours();
        let listDestination = await tugo.getListDestination();
        setListDestinations(listDestination.data);

        console.log({ tours, listDestination });
        if (query.get('idTour')) {
            let info = tours.data.find(tour => tour.id == query.get('idTour'));

            setId(info.id);
            setIdDestination(info.id_destination);
            setPosition(info.position);
            setDestination(info.destination);
            setDay(info.length.day);
            setNight(info.length.night);
            setDiscount(info.discount);
            setTitle(info.title);
            setThumbnail(info.thumbnail);
        }
        else {
            let lastId = Number(tours.data[tours.data.length - 1].id) + 1;
            setId(lastId);

        }
    }, [])

    return (
        <div className='p-3'>
            <div className='flex items-center mb-4'>
                <ArrowBackIcon
                    className='hover:bg-slate-400 rounded-full mr-3 p-2 cursor-pointer'
                    style={{ fontSize: '40px' }}
                    onClick={handleCancel}
                />
                {query.get('idTour') ?
                    (
                        <span className='text-2xl font-bold'>Bạn đang sửa tour {query.get('idTour')}</span>
                    )
                    :
                    (
                        <span className='text-2xl font-bold'>Bạn đang tạo tour mới</span>
                    )
                }
            </div>
            <div className='bg-white p-3 rounded-xl mb-4'>
                <div className='mb-3'>
                    <div>
                        <p className='font-bold text-2xl'>Info Tour</p>
                        <hr />
                    </div>
                    <div>
                        {thumbnail ?
                            <div>
                                <img
                                    src={thumbnail}
                                    alt=""
                                    className={clsx('w-[250px] h-[200px] rounded-xl hover:blur-sm')}
                                    title='Click to remove'
                                    onClick={() => setThumbnail('')}
                                />

                            </div>
                            :
                            (
                                <div>
                                    <label htmlFor='file' className='w-full col-span-1 h-[200px]  cursor-pointer rounded-xl  flex items-center hover:opacity-75'>
                                        <AddCircleOutlineIcon className='m-auto text-green-400 ' style={{ fontSize: '35px' }} />
                                    </label>
                                    <input
                                        type='file'
                                        id='file'
                                        // title='Click to add'
                                        style={{ display: 'none' }}
                                        onChange={handleAddImage}
                                    >
                                    </input>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className='flex flex-wrap'>
                    <Input
                        type='text'
                        value={id || ''}
                        onChange={(e) => setId(e.target.value)}
                        disabled={true}
                        label='ID'
                    />
                    <Input
                        type='text'
                        value={position || ''}
                        onChange={(e) => setPosition(e.target.value)}
                        disabled={true}
                        label='Position'
                    />
                    <Select
                        label='Destination'
                        options={listDestinations}
                        value={destination || ''}
                        onChange={(e) => {
                            setDestination(e.target.value)
                            let a = listDestinations.filter(item => item.name === e.target.value).map(x => x.id)
                            setIdDestination(a[0])
                        }}
                    // disabled={visible == 'create' ? false : true}
                    />
                    <Input
                        type='number'
                        value={day || 1}
                        onChange={(e) => setDay(e.target.value)}
                        label='Number of days'
                        title='Bạn không được phép sửa trường này.'
                    />
                    <Input
                        type='number'
                        value={night || 1}
                        onChange={(e) => setNight(e.target.value)}
                        label='Number of nights'
                        title='Bạn không được phép sửa trường này.'
                    />
                    <Input
                        type='number'
                        value={discount || 0}
                        onChange={(e) => setDiscount(e.target.value)}
                        label='Discounts (%)'
                        title='Bạn không được phép sửa trường này.'
                    />
                </div>
                <Textarea
                    label='Title'
                    value={title || ''}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className=' text-right'>
                    <Button type='cancel' onClick={handleCancel}>Cancel</Button>
                    <Button type='submit' onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
            <HandleDetailTour idTour={query.get('idTour')}/>
        </div>
    )
}

export default HandleTour;

function useQuery() {
    const { search } = useLocation();
    return new URLSearchParams(search);
}