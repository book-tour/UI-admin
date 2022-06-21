import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import TugoContext from '../contexts/tugo.context';
import clsx from 'clsx';

import IconHandle from '../components/IconHandle';
import HandleDestination from './handle/HandleDestination'
import swal from 'sweetalert';
const Destination = () => {
    const tugo = new TugoContext();
    const [listDestination, setListDestination] = useState([]);

    const [checkDelete, setCheckDelete] = useState(false);
    const [checkEdit, setCheckEdit] = useState(false);
    const [checkHandle, setCheckHandle] = useState('');
    const [listCheck, setListCheck] = useState([]);

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
    const handleDelete = async () => {
        console.log(listCheck);
        let count = 0;
        for (let i = 0; i < listCheck.length; i++) {
            try {
                let a = await tugo.deleteDestination({ 'id': listCheck[i] })
                console.log(a);
                count++;
            } catch (error) {
                swal("Error", 'Hiện đang có tour ở điểm du lịch này, hãy xóa đi những tour đó trước', "error");
                break;
            }

        }
        if (count == listCheck.length) {
            swal("Success", 'Xóa thành công', "success");
        }
        let data = await tugo.getListDestination();
        setListDestination(data.data);
    }
    useEffect(async () => {
        let data = await tugo.getListDestination();
        setListDestination(data.data);
        console.log(data);
    }, [])
    useEffect(async () => {
        let data = await tugo.getListDestination();
        setListDestination(data.data);
        console.log(data);
    }, [checkHandle])
    return (

        <div className="p-3">
            <div className='flex items-center my-3'>
                <p className='font-bold text-2xl my-0 mr-3'>List destinations</p>
                <IconHandle type='edit' animation={true} visible={checkEdit} onClick={() => setCheckHandle('edit')} />
                <IconHandle type='delete' animation={true} visible={checkDelete} onClick={handleDelete} />
                <IconHandle type='create' animation={true} onClick={() => setCheckHandle('create')} />
            </div>
            <div style={{ height: 400, width: '100%' }} className='bg-white rounded-2xl p-3'>
                <DataGrid
                    rows={listDestination}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    onSelectionModelChange={handleCheckBoxChange}
                />
            </div>
            {checkHandle &&
                <HandleDestination visible={checkHandle} data={listDestination} idDestination={listCheck[0]} setVisible={setCheckHandle} />
            }
        </div>
    )
}
export default Destination;


const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 120
    },
    {
        field: 'name',
        headerName: 'Tên điểm đến',
        width: 200,
        editable: true,
    },
    {
        field: 'alias',
        headerName: 'Mã định danh',
        description: 'This column does not editable',
        width: 220,
        editable: false,

    },
    {
        field: 'description',
        headerName: 'Mô tả',
        description: 'This column has a value getter and is not sortable.',
        editable: true,
        sortable: false,
        width: 700,
    },
];
