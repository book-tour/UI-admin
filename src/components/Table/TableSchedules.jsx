import React, { useEffect, useState } from 'react';
import TugoContext from '../../contexts/tugo.context';
import { DataGrid } from '@material-ui/data-grid';
import IconHandle from '../IconHandle';




const TableSchedules = ({ listTours }) => {
    const tugo = new TugoContext();
    const [checkDelete, setCheckDelete] = useState(false);
    const [checkEdit, setCheckEdit] = useState(false);
    const [checkHandle, setCheckHandle] = useState('');


    const [listSchedules, setListSchedules] = useState([]);// thay đổi khi select tour -> chữa cháy cho nhanh
    const [listSchedulesDefault, setListSchedulesDefault] = useState([]);// mặc định

    const [listCheck, setListCheck] = useState([]);

    const [selectValue, setSelectValue] = useState('all');
    const handleCheckBoxChange = (listIndex) => {
        console.log(listIndex);
        setCheckHandle('')
        setListCheck(listIndex);
        if (listIndex.length == 1) {
            setCheckEdit(true);
            setCheckDelete(true);
        }
        else if (listIndex.length > 1) {
            setCheckEdit(false);
            setCheckDelete(true);
        }
        else {
            setCheckEdit(false);
            setCheckDelete(false);
        }

    }
    const handleDelete = async () => { }


    useEffect(() => {
        let formatSchedule = listSchedulesDefault.filter(schedule => {

            return selectValue == 'all' ? true : schedule.id_tour == selectValue

        })
        console.log(selectValue, formatSchedule);
        setListSchedules(formatSchedule)

    }, [selectValue])
    useEffect(async () => {

        let schedules = await tugo.getSchedules();
        let formatSchedules = schedules.data.map(schedule => {
            return {
                ...schedule,
                adult: new Intl.NumberFormat('de-DE').format(schedule.adult) + ' vnd',
                child: new Intl.NumberFormat('de-DE').format(schedule.child) + ' vnd',
                small_child: new Intl.NumberFormat('de-DE').format(schedule.small_child) + ' vnd',
                new_born: new Intl.NumberFormat('de-DE').format(schedule.new_born) + ' vnd',
                hotel: new Intl.NumberFormat('de-DE').format(schedule.hotel) + ' vnd',
            }
        })
        console.log({ schedules });

        setListSchedules(formatSchedules);
        setListSchedulesDefault(formatSchedules)


    }, [])
    return (
        <div>
            <div className='my-3'>
                <div className='flex items-center my-1'>
                    <p className='font-bold text-2xl my-0 mr-3'>List Schedule</p>
                    <IconHandle type='edit' visible={checkEdit} onClick={() => setCheckHandle('edit')} />
                    <IconHandle type='delete' visible={checkDelete} onClick={handleDelete} />
                    <IconHandle type='create' onClick={() => setCheckHandle('create')} />
                </div>
                <div>
                    <label htmlFor="" className='font-semibold italic mr-2'>Select tour:</label>
                    <select name="" id="" className='bg-white p-2 rounded' value={selectValue} onChange={e => setSelectValue(e.target.value)}>
                        <option value="all">All</option>
                        {
                            listTours.map((item, index) => {
                                return (
                                    <option key={index} value={item.id}>{item.id}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
            <div style={{ height: 400, width: '100%' }} className='bg-white rounded-2xl p-3'>
                <DataGrid
                    rows={listSchedules}
                    columns={colSchedule}
                    pageSize={5}
                    checkboxSelection
                    onSelectionModelChange={handleCheckBoxChange}
                />
            </div>
        </div>
    )
}

export default TableSchedules;



const colSchedule = [
    {
        field: 'id',
        headerName: 'ID',
        width: 120
    },
    {
        field: 'depart_date',
        headerName: 'Ngày khởi hành',
        width: 200
    },
    {
        field: 'min_member',
        headerName: 'Số người tối thiểu',
        width: 200
    },
    {
        field: 'max_member',
        headerName: 'Số người tối đa',
        width: 200
    },
    {
        field: 'adult',
        headerName: 'Người lớn',
        width: 150
    },
    {
        field: 'child',
        headerName: 'Trẻ em(5-11 tuổi)',
        width: 200
    },
    {
        field: 'small_child',
        headerName: 'Trẻ em(2-5 tuổi)',
        width: 200
    },
    {
        field: 'new_born',
        headerName: 'Trẻ sơ sinh(<2 tuổi)',
        width: 200
    },
    {
        field: 'hotel',
        headerName: 'Giá phòng',
        width: 150
    },
    {
        field: 'hotel_feature',
        headerName: 'Loại khách sạn',
        width: 200
    }
]