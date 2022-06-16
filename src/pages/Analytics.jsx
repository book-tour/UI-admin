import { useState, useEffect } from 'react';
import TugoContext from '../contexts/tugo.context';
import Chart from 'react-apexcharts'
import Select from '../components/Form/Select';

const Analytics = () => {
    // const tugo = new TugoContext();
    // // const [listMoneyByMonth, setListMoneyByMonth] = useState([]);
    // const [dataChart, setDataChart] = useState({});



    // useEffect(async () => {
    //     let listMoneyByMonth = (await tugo.statisticMoneyByMonth()).data
    //     let formatData = listMonth.map(item => {
            
    //             listMoneyByMonth.map(list => list.month).indexOf(item) > 1 ? listMoneyByMonth.find(list => list.month == item).money : 0
                
    //     })
    //     console.log(formatData);
    //     setDataChart({

    //         series: [{
    //             name: 'Inflation',
    //             data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
    //             // data: listMonth.map(item => {
    //             //     listMoneyByMonth.length > 0 ?
    //             //         listMoneyByMonth.map(list => list.month).indexOf(item) > 1 ? listMoneyByMonth.find(list => list.month == item).money : 0
    //             //         : []
    //             // })
    //         }],
    //         options: {
    //             chart: {
    //                 height: 350,
    //                 type: 'bar',
    //             },
    //             plotOptions: {
    //                 bar: {
    //                     borderRadius: 10,
    //                     dataLabels: {
    //                         position: 'top', // top, center, bottom
    //                     },
    //                 }
    //             },
    //             dataLabels: {
    //                 enabled: true,
    //                 formatter: function (val) {
    //                     return val + "%";
    //                 },
    //                 offsetY: -20,
    //                 style: {
    //                     fontSize: '12px',
    //                     colors: ["#304758"]
    //                 }
    //             },

    //             xaxis: {
    //                 categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    //                 position: 'top',
    //                 axisBorder: {
    //                     show: false
    //                 },
    //                 axisTicks: {
    //                     show: false
    //                 },
    //                 crosshairs: {
    //                     fill: {
    //                         type: 'gradient',
    //                         gradient: {
    //                             colorFrom: '#D8E3F0',
    //                             colorTo: '#BED1E6',
    //                             stops: [0, 100],
    //                             opacityFrom: 0.4,
    //                             opacityTo: 0.5,
    //                         }
    //                     }
    //                 },
    //                 tooltip: {
    //                     enabled: true,
    //                 }
    //             },
    //             yaxis: {
    //                 axisBorder: {
    //                     show: false
    //                 },
    //                 axisTicks: {
    //                     show: false,
    //                 },
    //                 labels: {
    //                     show: false,
    //                     formatter: function (val) {
    //                         return val + "%";
    //                     }
    //                 }

    //             },
    //             title: {
    //                 text: 'Tổng doanh thu trong năm 2022 (VND)',
    //                 floating: true,
    //                 offsetY: 330,
    //                 align: 'center',
    //                 style: {
    //                     color: '#444'
    //                 }
    //             }
    //         },
    //     })
    // }, [])

    return (
        <div>
            {/* <div>
                <Select options={listYear} label='Tổng doanh thu trong năm' />
            </div>
            {
                dataChart.options && dataChart.series ?
                    <Chart options={dataChart?.options || ''} series={dataChart?.series || ''} type="bar" height={350} width='100%' />
                    :
                    <div>Loading...</div>
            } */}
        </div>
    )
}
export default Analytics;

const listMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const listYear = [
    { name: '2020', value: 2020 },
    { name: '2021', value: 2021 },
]
