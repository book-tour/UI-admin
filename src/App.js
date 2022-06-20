import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import './App.css';
import React from 'react';
//pages
import Login from './pages/Login'
import Home from './pages/Home'
import Analytics from './pages/Analytics'
import Destination from './pages/Destination'
import Tour from './pages/Tour'
import Payment from './pages/Payment'
// const component
import SideBar from './components/SideBar'
// handle
import HandleTour  from './pages/handle/HandleTour'
import HandleSchedule  from './pages/handle/HandleSchedule'

const configComponent = (component) => {
    return (
        <div className="flex">
            <SideBar />
            <div className="bg-[#f1f5f9] w-full">
                {component}
            </div>
        </div>
    )
}
let path = [
    {
        path: '/dashboard',
        component: configComponent(<Home />)
    },
    {
        path: '/tour',
        component: configComponent(<Tour />)
    },
    {
        path: '/destination',
        component: configComponent(<Destination />)
    },
    {
        path: '/payment',
        component: configComponent(<Payment />)
    },
    {
        path: '/analytics',
        component: configComponent(<Analytics />)
    },
    // handle : edit, create
    {
        path: '/tour/handle-tour',
        component: configComponent(<HandleTour />)
    },
    {
        path: '/tour/handle-schedule',
        component: configComponent(<HandleSchedule />)
    },
]


function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            {path.map((item, index) => {
                return (
                    <Route path={item.path} element={item.component} key={index} />
                )
            })}
        </Routes>
    );
}

export default App;
