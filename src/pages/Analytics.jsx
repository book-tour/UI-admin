import { useState, useEffect } from 'react';
import TugoContext from '../contexts/tugo.context';
import Chart from 'react-apexcharts'
import Select from '../components/Form/Select';

import {
    PieChart, Pie, Cell, ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Scatter
} from "recharts";


const Analytics = () => {


    return (
        <div>
            <div>
                <ComposedChart
                    width={1200}
                    height={400}
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {/* <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" /> */}
                    <Bar dataKey="value" barSize={50} fill="#413ea0" />
                    {/* <Line type="monotone" dataKey="member" stroke="#ff7300" /> */}
                    {/* <Scatter dataKey="cnt" fill="red" /> */}
                </ComposedChart>
                <p className='font-semibold text-xl text-center'>THỐNG KÊ TRONG NĂM 2021</p>
            </div>
            <div className='flex items-center justify-center flex-col w-full pt-5'>
                <PieChart width={200} height={200}>
                    <Pie
                        data={data}
                        cx={100}
                        cy={100}
                        labelLine={false}
                        isAnimationActive={false}
                        label={renderCustomizedLabel}
                        outerRadius={90}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
                <p className='font-semibold text-xl'>THỐNG KÊ THÀNH PHẦN THAM GIA TOUR</p>
            </div>
        </div>
    )
}
export default Analytics;


const data = [
    { name: "Người lớn", value: 800 },
    { name: "Trẻ em(5-11 tuổi)", value: 300 },
    { name: "Trẻ nhỏ(2-5 tuổi)", value: 150 },
    { name: "Trẻ sơ sinh", value: 150 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};




const data1 = [
    {
        name: "January",
        member: 590,
        money: 800,
        amt: 1400,
        cnt: 490
    },
    {
        name: "February",
        member: 868,
        money: 967,
        amt: 1506,
        cnt: 590
    },
    {
        name: "March",
        member: 1397,
        money: 1098,
        amt: 989,
        cnt: 350
    },
    {
        name: "April",
        member: 1480,
        money: 1200,
        amt: 1228,
        cnt: 480
    },
    // {
    //     name: "May",
    //     member: 1520,
    //     money: 1108,
    //     amt: 1100,
    //     cnt: 460
    // },
    // {
    //     name: "June",
    //     member: 1400,
    //     money: 680,
    //     amt: 1700,
    //     cnt: 380
    // },
    // {
    //     name: "July",
    //     member: 1400,
    //     money: 680,
    //     amt: 1700,
    //     cnt: 380
    // },
    // {
    //     name: "August",
    //     member: 1400,
    //     money: 680,
    //     amt: 1700,
    //     cnt: 380
    // },
    // {
    //     name: "September",
    //     member: 1400,
    //     money: 680,
    //     amt: 1700,
    //     cnt: 380
    // },
    // {
    //     name: "October",
    //     member: 1400,
    //     money: 680,
    //     amt: 1700,
    //     cnt: 380
    // },
    // {
    //     name: "November",
    //     member: 1400,
    //     money: 680,
    //     amt: 1700,
    //     cnt: 380
    // },
    // {
    //     name: "December",
    //     member: 1400,
    //     money: 680,
    //     amt: 1700,
    //     cnt: 380
    // }
];