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
// const component
import SideBar from './components/SideBar'

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
        path: '/analytics',
        component: configComponent(<Analytics />)
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
