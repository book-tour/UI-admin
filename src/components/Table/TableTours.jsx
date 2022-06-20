import React, { useEffect, useState } from 'react';
import TugoContext from '../../contexts/tugo.context';
import { DataGrid } from '@material-ui/data-grid';
import IconHandle from '../IconHandle';

import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const TableTours = ({ listTours }) => {
    const tugo = new TugoContext();
    const navigate = useNavigate();
    const [checkDelete, setCheckDelete] = useState(false);
    const [checkEdit, setCheckEdit] = useState(false);



    const [listCheck, setListCheck] = useState([]);


    const handleCheckBoxChange = (listIndex) => {
        console.log(listIndex);
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
        swal("Cẩn thận", "Bạn không thể xóa các tour này.", "error")
    }
    const handleEdit = () => {
        navigate(`/tour/handle-tour?idTour=${listCheck[0]}`);
    }
    const handleCreate = () => {
        navigate(`/tour/handle-tour`);
    }

    return (
        <div>
            <div className='flex items-center my-3'>
                <p className='font-bold text-2xl my-0 mr-3'>List Tours</p>
                <IconHandle type='edit' animation={true} visible={checkEdit} onClick={handleEdit} />
                <IconHandle type='delete' animation={true} visible={checkDelete} onClick={handleDelete} />
                <IconHandle type='create' animation={true} onClick={handleCreate} />
            </div>
            <div style={{ height: 400, width: '100%' }} className='bg-white rounded-2xl p-3'>
                <DataGrid
                    rows={listTours}
                    columns={colTours}
                    pageSize={5}
                    checkboxSelection
                    onSelectionModelChange={handleCheckBoxChange}
                />
            </div>
        </div>
    )
}

export default TableTours;




const colTours = [
    {
        field: 'id',
        headerName: 'ID',
        width: 120
    },
    {
        field: 'destination',
        headerName: 'Điểm đến',
        width: 200,
        editable: true,
    },
    {
        field: 'position',
        headerName: 'Điểm khởi hành',
        width: 200,
        editable: true,
    },
    {
        field: 'length',
        headerName: 'Độ dài',
        width: 200,
        editable: true,
    },
    {
        field: 'title',
        headerName: 'Mô tả',
        description: 'This column does not editable',
        width: 320,
        editable: false,
    },
];
