import React, { useEffect, useState } from 'react';
import TugoContext from '../contexts/tugo.context';
import { DataGrid } from '@material-ui/data-grid';
import moment from 'moment';
import IconHandle from '../components/IconHandle';
import swal from 'sweetalert';
import HandlePayment from './handle/HandlePayment';

const Payment = () => {
    const tugo = new TugoContext();
    const [listPayment, setListPayment] = useState([]);

    const [checkDelete, setCheckDelete] = useState(false);
    const [checkEdit, setCheckEdit] = useState(false);
    const [listCheck, setListCheck] = useState([]);

    const handleDelete = () => {
        swal("warning", 'Không thể xóa dữ liệu', "warning");
    }
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
    useEffect(async () => {
        let info = await tugo.getListPayment();
        let formatInfo = info.data.map(item => {
            return {
                ...item,
                created_at: moment(item.created_at).utc().format('MM/DD/YYYY')
            }
        })
        console.log(info);
        setListPayment(formatInfo);
    }, [])

    return (
        <div className="p-3">
            <div className='flex items-center my-3'>
                <p className='font-bold text-2xl my-0 mr-3'>LIST PAYMENT</p>
                <IconHandle type='edit' animation={true} visible={checkEdit}  />
                <IconHandle type='delete' animation={true} visible={checkDelete} onClick={handleDelete} />
                {/* <IconHandle type='create' onClick={() => setCheckHandle('create')} /> */}
            </div>
            <div style={{ height: 700, width: '100%' }} className='bg-white rounded-2xl p-3'>
                <DataGrid
                    rows={listPayment}
                    columns={columns}
                    pageSize={10}
                    checkboxSelection
                    onSelectionModelChange={handleCheckBoxChange}
                />
            </div>
            <HandlePayment />
        </div>
    )
}
export default Payment;



const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 90
    },
    {
        field: 'created_at',
        headerName: 'Ngày thanh toán',
        description: 'This column does not editable',
        width: 200,
        editable: false,

    },
    {
        field: 'check_payment',
        headerName: 'Trạng thái',
        width: 170
    },
    {
        field: 'id_tour',
        headerName: 'Tour',
        width: 120
    },
    {
        field: 'id_schedule',
        headerName: 'Schedule',
        width: 170
    },
    {
        field: 'encodeId',
        headerName: 'Encode ID',
        width: 200,
        editable: true,
    },
    {
        field: 'full_name',
        headerName: 'Họ và tên',
        description: 'This column does not editable',
        width: 220,
        editable: false,

    },
    {
        field: 'email',
        headerName: 'Email',
        description: 'This column has a value getter and is not sortable.',
        editable: true,
        sortable: false,
        width: 200,
    },
    {
        field: 'phone',
        headerName: 'Số Điện Thoại',
        description: 'This column does not editable',
        width: 200,
        editable: false,

    },
    {
        field: 'address',
        headerName: 'Địa chỉ',
        description: 'This column does not editable',
        width: 220,
        editable: false,

    },
    {
        field: 'total_price',
        headerName: 'Tổng giá',
        description: 'This column does not editable',
        width: 220,
        editable: false,

    },

];
