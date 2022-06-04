import React, { useEffect, useState } from 'react';
import TugoContext from '../../contexts/tugo.context';

import Input from './Input';
import Textarea from './Textarea';
import Select from './Select';
import Button from '../Button'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import ExtendFunction from '../../utils/extendFunction';
import swal from 'sweetalert';
// cái form để tạo mới hoặc edit
const HandleDestination = (props) => {
    const { visible, data, listCheck, setVisible } = props;
    const tugo = new TugoContext();
    const extendFunc = new ExtendFunction();

    const [listDistricts, setListDistricts] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [alias, setAlias] = useState('');
    const [listThumbnail, setListThumbnail] = useState([]);

    const [fileImage, setFileImage] = useState([]);
    const [base64, setBase64] = useState([]);

    const handleAddImage = (e) => {
        const file = e.target.files[0]
        setFileImage([
            ...fileImage,
            file
        ])
        var reader = new FileReader();
        reader.onloadend = function () {
            // console.log(reader.result)
            setBase64([
                ...base64,
                reader.result
            ])
        }
        reader.readAsDataURL(file);

        file.preview = URL.createObjectURL(file)
    }
    const handleSubmit = async () => {
        let list = []
        let i = new Promise((resolve, reject) => {
            if (fileImage.length > 0) {
                for (let i = 0; i < fileImage.length; i++) {
                    resolve(extendFunc.processFile(fileImage[i], list, id))
                }
            }
            resolve(1)
        });
        i.then(async res => {
            console.log(res, list)
            let infoDestination = {
                id: id,
                name: name,
                description: description,
                alias: alias,
                listThumbnail: JSON.stringify([...listThumbnail, ...list]),
            }
            try {
                if (visible === 'create') {
                    if (infoDestination.name === '' || infoDestination.description === '' || infoDestination.alias === '' || infoDestination.listThumbnail === []) {
                        swal('Thông báo', 'Vui lòng nhập đầy đủ thông tin', 'warning')
                    }
                    else {
                        let data = await tugo.createDestination(infoDestination);
                        console.log(data);
                        if (data.desc === 'success') {
                            swal("Thành công", "Thêm mới thành công", "success");
                            setVisible('');
                        }
                        else {
                            swal("Thất bại", "Thêm mới thất bại", "error");
                        }
                    }
                }
                else if (visible === 'edit') {
                    let data = await tugo.updateDestination(infoDestination);
                    if (data.desc === 'success') {
                        swal("Thành công", "Cập nhật thành công", "success");
                        setVisible('');
                    }
                    else {
                        swal("Thất bại", "Cập nhật thất bại", "error");
                    }
                }
            } catch (error) {
                console.log(error)
            }
        })
    }

    useEffect(async () => {
        const list = await tugo.getListDistricts()
        console.log(list);
        console.log(data);
        setListDistricts(list)
        if (visible === 'edit' && listCheck.length === 1) {
            let infoDestination = data[listCheck[0] - 1]
            console.log(infoDestination);

            setListThumbnail(infoDestination.listThumbnail)
            setId(infoDestination.id);
            setName(infoDestination.name);
            setDescription(infoDestination.description);
            setAlias(infoDestination.alias);

            setFileImage([])
            setBase64([])
        }
        else if (visible === 'create') {
            setListThumbnail([])
            setId(data.length + 1);
            setName('');
            setDescription('');
            setAlias('');

            setFileImage([])
            setBase64([])
        }
    }, [visible, listCheck])

    return (
        <div>
            {visible !== '' ?
                <>
                    <p className="font-bold text-2xl mx-2 my-4">Handle Destination</p>
                    <div className="bg-white rounded-2xl p-3">
                        <div>
                            <div>
                                <p className='font-bold text-2xl'>Hình ảnh:</p>
                                <hr />
                                <div className='grid grid-cols-5'>
                                    {listThumbnail && listThumbnail.length > 0 ?
                                        listThumbnail.map((item, index) => {
                                            return (
                                                <img
                                                    src={item}
                                                    alt=""
                                                    key={index}
                                                    className="w-full col-span-1 h-[200px] cursor-pointer rounded-xl m-2 hover:blur-sm px-2	"
                                                    title='Click to remove'
                                                    onClick={function () {
                                                        let newArr = listThumbnail.filter((item, i) => i !== index)
                                                        setListThumbnail(newArr)
                                                    }}
                                                />
                                            )
                                        })
                                        : null
                                    }
                                    {base64 && base64.length > 0 ?
                                        base64.map((item, index) => {
                                            return (
                                                <img
                                                    src={item}
                                                    alt=""
                                                    key={index}
                                                    className="w-full col-span-1 h-[200px] cursor-pointer rounded-xl m-2 hover:blur-sm px-2"
                                                    title='Click to remove'
                                                    onClick={() => {
                                                        setFileImage(fileImage.filter((item, i) => i !== index))
                                                        setBase64(base64.filter((item, i) => i !== index))
                                                    }}
                                                />
                                            )
                                        })
                                        : null
                                    }
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
                            </div>
                            <div className='mt-6'>
                                <p className='font-bold text-2xl'>Thông tin chi tiết điểm đến</p>
                                <hr />
                                <div className='flex items-center'>
                                    <Input
                                        type='text'
                                        value={id || ''}
                                        onChange={(e) => setId(e.target.value)}
                                        disabled={true}
                                        label='ID'
                                        title='Bạn không được phép sửa trường này.'
                                    />
                                    <Input
                                        type='text'
                                        value={alias || ''}
                                        onChange={(e) => setAlias(e.target.value)}
                                        label='Mã định danh'
                                        disabled={true}
                                        title='Bạn không được phép sửa trường này.'
                                    />
                                    <Select
                                        label='Tên điểm đến'
                                        options={listDistricts}
                                        value={name || ''}
                                        onChange={(e) => {
                                            setName(e.target.value)
                                            let a = listDistricts.filter(district => district.name === e.target.value).map(x => x.codename)
                                            setAlias(a[0])
                                        }}
                                        disabled={visible == 'create' ? false : true}
                                        title='Bạn không được phép sửa trường này.'
                                    />
                                </div>
                                <Textarea
                                    label='Mô tả'
                                    value={description || ''}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className=' text-right'>
                                <Button type='cancel' onClick={() => setVisible('')}>Cancel</Button>
                                <Button type='submit' onClick={handleSubmit}>Submit</Button>
                            </div>
                        </div>
                    </div>
                </>
                :
                null
            }
        </div>
    )
}
export default HandleDestination;
