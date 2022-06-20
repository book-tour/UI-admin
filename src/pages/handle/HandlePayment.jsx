import { useState, useEffect } from 'react';
import TugoContext from '../../contexts/tugo.context';
import Input from '../../components/Form/Input';
import Textarea from '../../components/Form/Textarea';
import Select from '../../components/Form/Select';
import Button from '../../components/Button'


import swal from 'sweetalert';
import clsx from 'clsx';
import ExtendFunction from '../../utils/extendFunction';


const HandlePayment = (props) => {
    const { id, setShowPayment } = props;
    const tugo = new TugoContext();
    const extendFunc = new ExtendFunction();

    const [checkPayment, setCheckPayment] = useState('');
    const [adult, setAdult] = useState(0);
    const [child, setChild] = useState(0);
    const [smallChild, setSmallChild] = useState(0);
    const [newBorn, setNewBorn] = useState(0);

    const handleCancel = () => {
        setShowPayment(false);
    }
    const handleSubmit = () => {
        let data = {
            check_payment: checkPayment == 'Đã thanh toán' ? 1 : 0,
        }
        console.log(data);
        tugo.updatePayment(id, data)
            .then(res => {
                swal("Thành công", "Cập nhật thành công", "success")
                    .then(() => {
                        setShowPayment(false);
                    })
            })
            .catch(err => {
                swal("Thất bại", "Cập nhật thất bại", "error")
            })
    }
    useEffect(async () => {
        let info = (await tugo.getItemPayment(id)).data
        console.log(info);
        setCheckPayment(info.check_payment == '1' ? 'Đã thanh toán' : 'Chưa thanh toán');

        setAdult(info.adult);
        setChild(info.child);
        setSmallChild(info.small_child);
        setNewBorn(info.new_born);
    }, [])

    return (
        <div>
            <p className="font-bold text-2xl mx-2 my-4">INFORMATION DETAIL</p>
            <div className="bg-white rounded-2xl p-3">
                <div className='flex items-center flex-wrap gap-4'>
                    <Select
                        label='Trạng thái'
                        options={section}
                        value={checkPayment}
                        onChange={(e) => {
                            setCheckPayment(e.target.value)
                        }}
                        // disabled={visible == 'create' ? false : true}
                        title='Bạn không được phép sửa trường này.'
                    />
                    <Input
                        type='number'
                        value={adult}
                        onChange={(e) => setAdult(e.target.value)}
                        disabled={true}
                        label='Số lượng người lớn'
                        title='Bạn không được phép sửa trường này.'
                    />
                    <Input
                        type='number'
                        value={child}
                        onChange={(e) => setChild(e.target.value)}
                        disabled={true}
                        label='Số lượng trẻ em(5-11 tuổi)'
                        title='Bạn không được phép sửa trường này.'
                    />
                    <Input
                        type='number'
                        value={smallChild}
                        onChange={(e) => smallChild(e.target.value)}
                        disabled={true}
                        label='Số lượng trẻ nhỏ(2-5 tuổi)'
                        title='Bạn không được phép sửa trường này.'
                    />
                    <Input
                        type='number'
                        value={newBorn}
                        onChange={(e) => newBorn(e.target.value)}
                        disabled={true}
                        label='Số lượng trẻ sơ sinh'
                        title='Bạn không được phép sửa trường này.'
                    />
                </div>
                <div className=' text-right'>
                    <Button type='cancel' onClick={handleCancel}>Cancel</Button>
                    <Button type='submit' onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default HandlePayment;

const section = [
    {
        name: 'Đã thanh toán',
    },
    {
        name: 'Chưa thanh toán',
    }
]