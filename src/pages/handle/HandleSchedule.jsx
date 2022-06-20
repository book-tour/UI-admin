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

const HandleSchedule = () => {
    const tugo = new TugoContext();
    const extendFunc = new ExtendFunction();
    const query = useQuery();
    const navigate = useNavigate();

    const [id, setId] = useState(0);
    const [idTour, setIdTour] = useState(0);
    const [departDate, setDepartDate] = useState('');
    const [minMember, setMinMember] = useState(0);
    const [maxMember, setMaxMember] = useState(0);
    const [adult, setAdult] = useState(0);
    const [child, setChild] = useState(0);
    const [smallChild, setSmallChild] = useState(0);
    const [newBorn, setNewBorn] = useState(0);
    const [hotel, setHotel] = useState(0);
    const [hotelFeature, setHotelFeature] = useState('');

    const [listTours, setListTours] = useState([]);
    const handleCancel = () => {
        navigate('/tour')
    }
    const handleSubmit = () => {
        let data = {
            id_tour: idTour,
            depart_date: departDate,
            min_member: minMember,
            max_member: maxMember,
            adult,
            child,
            small_child: smallChild,
            new_born: newBorn,
            hotel,
            hotel_feature: hotelFeature
        }
        console.log(data);
        tugo.updateItemSchedule(id, data)
            .then(res => {
                swal("Thành công", "Cập nhật thành công", "success")
                    .then(() => {
                        navigate('/tour')
                    })
            })
            .catch(err => {
                swal("Thất bại", "Cập nhật thất bại", "error")
            })
    }
    useEffect(async () => {
        let infoTour = await tugo.getTours()
        let formatInfo = infoTour.data.map(item => {
            return {
                name: item.id
            }
        })
        console.log(infoTour);
        setListTours(formatInfo)

        if (query.get('idSchedule')) {
            setId(query.get('idSchedule'));
            let info = (await tugo.getItemSchedule(query.get('idSchedule'))).data
            console.log(info);
            setIdTour(info.id_tour);
            setAdult(info.adult);
            setChild(info.child);
            setSmallChild(info.small_child);
            setNewBorn(info.new_born);
            setDepartDate(info.depart_date);
            setMinMember(info.min_member);
            setMaxMember(info.max_member);
            setHotel(info.hotel);
            setHotelFeature(info.hotel_feature);
        }
        else {
            let listSchedule = (await tugo.getSchedules()).data
            console.log(listSchedule);
            setId(listSchedule[listSchedule.length-1].id);
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
                {query.get('idSchedule') ?
                    (
                        <span className='text-2xl font-bold'>BẠN ĐANG SỬA CHI TIẾT TOUR {query.get('idSchedule')}</span>
                    )
                    :
                    (
                        <span className='text-2xl font-bold'>BẠN ĐANG TẠO MỚI CHI TIẾT TOUR</span>
                    )
                }
            </div>
            <div className='bg-white p-3 rounded-xl mb-4'>
                <div className='mb-3'>
                    <div>
                        <p className='font-bold text-2xl'>Thông tin cụ thể</p>
                        <hr />
                    </div>

                </div>
                <div className='flex flex-wrap gap-3 my-2'>
                    <Input
                        type='text'
                        value={id || ''}
                        onChange={(e) => setId(e.target.value)}
                        disabled={true}
                        label='ID'
                    />
                    <Select
                        label='ID tour'
                        options={listTours}
                        value={idTour || ''}
                        onChange={(e) => {
                            setIdTour(e.target.value)
                        }}
                        disabled={query.get('idSchedule') ? true : false}
                        title={query.get('idSchedule') && 'ID tour không thể thay đổi khi chỉnh sửa'}
                    />
                    <Input
                        type='date'
                        value={departDate || ''}
                        onChange={(e) => setDepartDate(e.target.value)}
                        label='Ngày khởi hành'
                    // disabled={query.get('idSchedule') ? true : false}
                    // title={query.get('idSchedule') && 'Ngày khởi hành không thể thay đổi khi chỉnh sửa'}
                    />
                    <Input
                        type='number'
                        value={minMember || 1}
                        onChange={(e) => setMinMember(e.target.value)}
                        label='Số lượng tối thiểu'
                    />
                    <Input
                        type='number'
                        value={maxMember || 1}
                        onChange={(e) => setMaxMember(e.target.value)}
                        label='Số lượng tối đa'
                    />

                </div>
                <div className='flex flex-wrap gap-3 my-3'>
                    <Input
                        type='number'
                        value={adult || 0}
                        onChange={(e) => setAdult(e.target.value)}
                        label='Giá tiền người lớn'
                    />
                    <Input
                        type='number'
                        value={child || 0}
                        onChange={(e) => setChild(e.target.value)}
                        label='Giá tiền trẻ em(5-11 tuổi)'
                    />
                    <Input
                        type='number'
                        value={smallChild || 0}
                        onChange={(e) => setSmallChild(e.target.value)}
                        label='Giá tiền trẻ nhỏ(2-5 tuổi)'
                    />
                    <Input
                        type='number'
                        value={newBorn || 0}
                        onChange={(e) => setNewBorn(e.target.value)}
                        label='Giá tiền trẻ sơ sinh'
                    />

                </div>
                <div className='flex flex-wrap gap-3 my-3'>
                    <Input
                        type='number'
                        value={hotel || 0}
                        onChange={(e) => setHotel(e.target.value)}
                        label='Giá khách sạn'
                    />
                    <Input
                        type='text'
                        value={hotelFeature || 0}
                        onChange={(e) => setHotelFeature(e.target.value)}
                        label='Loại khách sạn'
                    />
                </div>
                <div className=' text-right mt-4'>
                    <Button type='cancel' onClick={handleCancel}>Cancel</Button>
                    <Button type='submit' onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default HandleSchedule;



function useQuery() {
    const { search } = useLocation();
    return new URLSearchParams(search);
}