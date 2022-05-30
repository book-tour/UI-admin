import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import './App.css';
import React from 'react';
//pages
import Home from './pages/Home'
// const component
import Header from './components/Header'
import Footer from './components/Footer'

const configComponent = (component) => {
    return (
        <div>
            <Header />
            <div className="mt-12 mb-[60px]">
                {component}
            </div>

            <Footer />
        </div>
    )
}
let path = [
 
    {
        path: '/dashboard',
        component: configComponent(<Home />)
    },
  
]


function App() {
    return (
        <Routes>
            {path.map((item, index) => {
                return (
                    <Route path={item.path} element={item.component} key={index} />
                )
            })}
        </Routes>
    );
}

export default App;
