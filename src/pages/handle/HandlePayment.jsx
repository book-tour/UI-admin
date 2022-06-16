

import Input from '../../components/Form/Input';
import Textarea from '../../components/Form/Textarea';
import Select from '../../components/Form/Select';
import Button from '../../components/Button'

const HandlePayment = () => {


    return (
        <div>
            <p className="font-bold text-2xl mx-2 my-4">INFORMATION DETAIL</p>
            <div className="bg-white rounded-2xl p-3">
                <div className='flex items-center flex-wrap gap-4'>
                    <Select
                        label='Trạng thái'
                        options={section}
                        value={'Đã thanh toán'}
                        // onChange={(e) => {
                        //     setName(e.target.value)
                        //     let a = listDistricts.filter(district => district.name === e.target.value).map(x => x.codename)
                        //     setAlias(a[0])
                        // }}
                        // disabled={visible == 'create' ? false : true}
                        title='Bạn không được phép sửa trường này.'
                    />
                    <Input
                        type='text'
                        value={'6'}
                        // onChange={(e) => setId(e.target.value)}
                        disabled={true}
                        label='Số lượng người lớn'
                        title='Bạn không được phép sửa trường này.'
                    />
                    <Input
                        type='text'
                        value={'3'}
                        // onChange={(e) => setId(e.target.value)}
                        disabled={true}
                        label='Số lượng trẻ em(5-11 tuổi)'
                        title='Bạn không được phép sửa trường này.'
                    />
                    <Input
                        type='text'
                        value={'0'}
                        // onChange={(e) => setId(e.target.value)}
                        disabled={true}
                        label='Số lượng trẻ nhỏ(2-5 tuổi)'
                        title='Bạn không được phép sửa trường này.'
                    />
                    <Input
                        type='text'
                        value={'0'}
                        // onChange={(e) => setId(e.target.value)}
                        disabled={true}
                        label='Số lượng trẻ sơ sinh'
                        title='Bạn không được phép sửa trường này.'
                    />
                </div>
                <div className=' text-right'>
                    <Button type='cancel'>Cancel</Button>
                    <Button type='submit' >Submit</Button>
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