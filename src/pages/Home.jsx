import { useEffect, useState } from 'react';
import hoian3 from '../assets/hoian3.jpg';
import Button from '../components/Button';
import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ExtendFunction from '../utils/extendFunction';
import TugoContext from '../contexts/tugo.context';
import clsx from 'clsx';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.css';
import ItemNearestTour from '../components/ItemNearestTour';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const tugo = new TugoContext();
    const extendFunc = new ExtendFunction();
    const navigate = useNavigate();
    const [listNearestTour, setListNearestTour] = useState([]);
    const [listDestination, setListDestination] = useState([]);
    const [listPayment, setListPayment] = useState([]);
    const [totalPayment, setTotalPayment] = useState(0);

    useEffect(async () => {
        let infoNearestTour = await tugo.getItemWithSummaryInformation()
        console.log(infoNearestTour); 
        setListNearestTour(infoNearestTour.data);
        setListDestination((await tugo.getListDestination()).data);

        let infoPayment = (await tugo.getListPaymentDesc()).data;
        setListPayment(infoPayment);
        console.log(infoPayment);

        setTotalPayment(infoPayment.reduce((total, item) => {return total+item.total_price}, 0));
    }, [])
    
    return (
        <div className='grid grid-cols-3 p-5'>
            <div className='col-span-2 px-3'>
                <div className='bg-white rounded-2xl grid grid-cols-2 p-3 mb-4'>
                    <img src={hoian3} alt="" className=' w-full h-[180px] rounded-2xl col-span-1 px-2' />
                    <div>
                        <p className='text-xl font-bold'>Hey boss, welcome back!</p>
                        <p>tugo is growing and expanding its market</p>
                        <div>
                            <Button type='submit' onClick={()=> navigate('/tour/handle-tour')}>Create tour</Button>
                            <Button type='cancel' onClick={()=> navigate('/destination')}>Create destination</Button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='my-2 flex i justify-between '>
                        <div className='cursor-pointer'>
                            <span className='font-bold text-2xl'>Your nearest tours</span>
                            <span className='text-slate-400 font-bold mx-2 text-sm'>{listNearestTour.length} tours</span>
                        </div>
                        <div>
                            <p className='text-[#008af7] cursor-pointer hover:underline' onClick={()=> navigate('/tour')}>view all</p>
                        </div>
                    </div>
                    <SimpleBar>
                        <div className='flex mb-3'>
                            {listNearestTour.map((item, index) => {
                                return (
                                    <ItemNearestTour key={index} props={{ item }} />
                                )
                            })}
                        </div>
                    </SimpleBar>
                </div>
                <div>
                    <div className='my-2 flex i justify-between mt-3'>
                        <div className='cursor-pointer'>
                            <span className='font-bold text-2xl'>List destinations</span>
                            <span className='text-slate-400 font-bold mx-2 text-sm'>{listDestination.length} destinations</span>
                        </div>
                        <div>
                            <p className='text-[#008af7] cursor-pointer hover:underline' onClick={()=> navigate('/destination')}>view all</p>
                        </div>
                    </div>
                    <SimpleBar>
                        <div className='flex mb-3'>
                            {listDestination.map((item, index) => {
                                return (
                                    <div >
                                        <div className='bg-white rounded-2xl w-[220px] px-2 py-3 mx-2 '>
                                            <img src={item.listThumbnail[0]} alt="" className='w-full h-[250px] rounded-xl' />
                                            <p className='text-center font-semibold text-lg m-0 my-2'>{item.name}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </SimpleBar>
                </div>
            </div>
            <div className='col-span-1 px-3'>
                <div className='bg-white rounded-2xl w-full p-2'>
                    <p className='font-bold '>Your Balance:</p>
                    <span>
                        <span>Total :</span>
                        <span className='font-bold'>{new Intl.NumberFormat('de-DE').format(totalPayment)} vnd</span>
                    </span>
                    <LineChart
                        width={400}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        {/* <XAxis dataKey="name" /> */}
                        {/* <YAxis  /> */}
                        <Tooltip />
                        {/* <Legend /> */}
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" fontWeight={700} activeDot={{ r: 8 }} />
                        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                    </LineChart>
                </div>
                <div className='bg-white rounded-2xl w-full p-2 my-3'>
                    <p className='font-bold'>Top 5 member:</p>
                    {listPayment.map((item, index) => {
                        if (index < 5) {
                            return (
                                <div className='mx-2'>
                                    <div className='flex items-center justify-between '>
                                        <div className='flex items-center'>
                                            <img src={"/animal/" + Number(index + 1) + ".png"} alt="" className='rounded-full w-12 h-12' />
                                            <div className='mx-1'>
                                                <p className='m-0 font-bold'>{item.full_name}</p>
                                                <p className='m-0 text-slate-400 italic text-xs'>{item.email}</p>
                                            </div>
                                        </div>
                                        <p className='font-bold'>{new Intl.NumberFormat('de-DE').format(item.total_price)} vnd</p>
                                    </div>
                                    <hr />
                                </div>
                            )
                        }
                        return null
                    })}
                </div>
            </div>
        </div>
    )
}
export default Home;

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];
const slideImages = [
    {
        url: 'https://res.cloudinary.com/dhz4hr8dq/image/upload/v1648257873/doan1/tour/Da_Lat_City_n8srlv.jpg',
        caption: 'Slide 1'
    },
    {
        url: 'https://res.cloudinary.com/dhz4hr8dq/image/upload/v1648257873/doan1/tour/Da_Lat_City_n8srlv.jpg',
        caption: 'Slide 2'
    },
    {
        url: 'https://res.cloudinary.com/dhz4hr8dq/image/upload/v1648257873/doan1/tour/Da_Lat_City_n8srlv.jpg',
        caption: 'Slide 3'
    },
];