import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import TugoContext from '../../contexts/tugo.context';

import Input from '../../components/Form/Input';
import Textarea from '../../components/Form/Textarea';
import Select from '../../components/Form/Select';
import Button from '../../components/Button'

import clsx from 'clsx';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from '@material-ui/core/styles';
import IconHandle from '../../components/IconHandle';

import ListSchedule from '../../components/ListSchedule/ListSchedule';
import ListThumbnail from '../../components/CloudImage/ListThumbnail';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ExtendFunction from '../../utils/extendFunction';
import swal from 'sweetalert';

const HandleDetailTour = ({ idTour, tours }) => {
    const classes = useStyles();
    const tugo = new TugoContext();
    const extendFunc = new ExtendFunction();
    const navigation = useNavigate();

    const [id, setId] = useState(0);
    const [description, setDescription] = useState('');
    const [listThumbnail, setListThumbnail] = useState([]);
    const [listSchedule, setListSchedule] = useState([
        {
            title: '',
            schedule: [
                {
                    title: '',
                    time: 'Sáng',
                    des: ['']
                },
                {
                    title: '',
                    time: 'Chiều',
                    des: ['']
                }
            ]
        }
    ]);

    const [fileImage, setFileImage] = useState([]);
    const [base64, setBase64] = useState([]);

    const handleCreateNewSchedule = () => {
        setListSchedule([...listSchedule, {
            title: '',
            schedule: [
                {
                    title: '',
                    time: 'Sáng',
                    des: ['']
                },
                {
                    title: '',
                    time: 'Chiều',
                    des: ['']
                }
            ]
        }])
    }
    const handleDeleteThumbnail = (index) => {
        let newArr = listThumbnail.filter((item, i) => i !== index)
        setListThumbnail(newArr)
    }
    const handleCreateNewImage = (e) => {
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
    const handleSubmit = () => {
        let list = []
        let i = new Promise((resolve, reject) => {
            if (fileImage.length > 0) {
                for (let i = 0; i < fileImage.length; i++) {
                    resolve(extendFunc.processFile(fileImage[i], list, `detailTour/${id}`))
                }
            }
            resolve(1)
        });
        i.then(async (res) => {
            console.log(list)
            let data = {
                listThumbnail: JSON.stringify([
                    ...listThumbnail,
                    ...list
                ]),
                description,
                schedule: JSON.stringify(listSchedule)
            }
            tugo.updateDetailTours(idTour, data)
                .then(res => {
                    swal("Thành công", "Cập nhật thành công", "success")
                        .then(() => {
                            navigation('/tour')
                        })
                })
                .catch(err => {
                    swal("Thất bại", "Cập nhật thất bại", "error")
                })
        })
    }

    useEffect(async () => {
        console.log(idTour);
        if (idTour) {
            let info = (await tugo.getDetailTours(idTour)).data
            console.log(info);

            setId(info.id);
            setDescription(info.description);
            setListThumbnail(info.listThumbnail);
            setListSchedule(info.schedule);
        }
    }, [])

    return (
        <div className='bg-white p-3 rounded-xl'>
            <div>
                <div>
                    <div className='flex items-center'>
                        <p className='font-bold text-2xl m-0'>Tập hình ảnh</p>
                        <label htmlFor='file' className=''>
                            <IconHandle type='create' animation={true} />
                        </label>
                        <input
                            type='file'
                            id='file'
                            // title='Click to add'
                            style={{ display: 'none' }}
                            onChange={handleCreateNewImage}
                        >
                        </input>
                    </div>
                    <hr />
                </div>
                <div className='flex items-center flex-wrap gap-5'>
                    {listThumbnail?.length && listThumbnail.length > 0 ?
                        listThumbnail.map((thumbnail, index) => {
                            return (
                                <div className="w-[250px] h-[200px] relative">
                                    <img
                                        src={thumbnail}
                                        alt=""
                                        className={clsx('w-full h-full rounded ')}
                                        title='Click to remove'
                                    // onClick={() => setThumbnail('')}
                                    />
                                    <HighlightOffIcon
                                        className="top-[-15px] absolute right-[-15px] bg-white text-red-400 hover:text-red-500 cursor-pointer rounded-full"
                                        style={{ fontSize: '35px' }}
                                        titleAccess='Nhấn để xóa'
                                        onClick={() => handleDeleteThumbnail(index)}
                                    />
                                </div>
                            )
                        })
                        : null
                    }
                    {base64?.length && base64.length > 0 ?
                        base64.map((item, index) => {
                            return (
                                <div className="w-[250px] h-[200px] relative">
                                    <img
                                        src={item}
                                        alt=""
                                        className={clsx('w-full h-full rounded ')}
                                    />
                                    <HighlightOffIcon
                                        className="top-[-15px] absolute right-[-15px] bg-white text-red-400 hover:text-red-500 cursor-pointer rounded-full"
                                        style={{ fontSize: '35px' }}
                                        titleAccess='Nhấn để xóa'
                                        onClick={() => {
                                            setFileImage(fileImage.filter((item, i) => i !== index))
                                            setBase64(base64.filter((item, i) => i !== index))
                                        }}
                                    />
                                </div>
                            )
                        })
                        : null
                    }
                </div>
            </div>
            <div className='my-4'>
                <div>
                    <p className='font-bold text-2xl'>Thông tin khác</p>
                    <hr />
                </div>
                <div>
                    <div className='my-4 '>
                        <div className='flex items-center'>
                            <span className='font-semibold text-xl mr-2'>Mô tả</span>
                        </div>
                    </div>
                    <div>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Nhập tiêu đề'
                        />
                    </div>
                </div>
                <div>
                    <div className='my-4 '>
                        <div className='flex items-center'>
                            <span className='font-semibold text-xl mr-2'>Lịch trình cụ thể</span>
                            <IconHandle type='create' animation={true} onClick={handleCreateNewSchedule} />
                        </div>
                    </div>
                    <ListSchedule listSchedule={listSchedule} setListSchedule={setListSchedule} />
                </div>
            </div>
            <div className=' text-right mt-4'>
                <Button type='cancel' >Cancel</Button>
                <Button type='submit' onClick={handleSubmit}>Submit</Button>
            </div>
        </div >
    )
}

export default HandleDetailTour;

const useStyles = makeStyles((theme) => ({
    input: {
        outline: 'none'
    },
}));