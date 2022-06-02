import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';
import clsx from 'clsx';

import style from './Login.module.css';
import logo from '../../assets/logo.png'
import hotel from '../../assets/hotel.png'
import res from '../../assets/res.png'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import ExtendFunction from '../../utils/extendFunction';
import swal from 'sweetalert';

const LoginUI = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const extendFunc = new ExtendFunction();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleCancel = () => {
        setUsername('');
        setPassword('');
    }
    const handleSignIn = () => {
        if (extendFunc.checkPermission(username, password)) {
            swal({
                title: "Login Success",
                text: "Welcome to Hotel Management System",
                icon: "success",
                button: "OK",
            }).then((res) => {
                if (res== true) {
                    localStorage.setItem('tugo-admin', '1');
                    navigate('/dashboard');
                }
            })
        } else {
            swal("Login Failed!", "Wrong username or password", "error");
        }
    }
    useEffect(() => {
        localStorage.removeItem('tugo-admin')
    }, [])
    return (
        <div className='bg-[#525461] fixed top-0 bottom-0 right-0 left-0 m-auto flex items-center justify-center'>
            <div className="  rounded-xl bg-[url('background.jpg')] w-3/4 h-3/4 bg-center	">
                <div className={clsx('w-full h-full rounded-xl ', style.container)}>
                    <div className='flex items-center px-3 py-1'>
                        <img src={logo} alt="" className='w-[70px] ' />
                        <img src={hotel} alt="" className='w-[70px] ' />
                        <img src={res} alt="" className='w-[70px] ' />
                    </div>
                    <div className='grid grid-cols-2 w-full h-full'>
                        <div className='col-span-1 m-auto w-1/2'>
                            <p className='text-white font-semibold text-2xl'>Start as a manager</p>
                            <div className='my-3 bg-[#323645] rounded-xl  text-white w-full px-3 py-1 focus-within:border-cyan-500 focus-within:border-2'>
                                <p className='text-[#656873] m-0 text-xs '>Username</p>
                                <span className='flex items-center'>
                                    <input
                                        type="text"
                                        placeholder='...'
                                        className={clsx('bg-transparent py-2 w-full', classes.input)}
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <AccountCircleIcon />
                                </span>
                            </div>
                            <div className='my-2 bg-[#323645] rounded-xl  text-white w-full px-3 py-1 focus-within:border-cyan-500 focus-within:border-2'>
                                <p className='text-[#656873] m-0 text-xs '>Password</p>
                                <span className='flex items-center'>
                                    <input
                                        type="password"
                                        placeholder='...'
                                        className={clsx('bg-transparent py-2 w-full', classes.input)}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.keyCode === 13) {
                                                handleSignIn();
                                            }
                                        }}
                                    />
                                    <LockIcon />
                                </span>
                            </div>
                            <div className='grid grid-cols-2 my-4'>
                                <button className='col-span-1 text-white p-2 rounded-2xl hover:bg-slate-400 mx-1' onClick={handleCancel}>Cancel</button>
                                <button className=' bg-[#1d90f4] text-white p-2 rounded-2xl hover:opacity-80 mx-1' onClick={handleSignIn}>Sign In</button>
                            </div>
                        </div>
                        <div className='col-span-1'>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default LoginUI;

const useStyles = makeStyles((theme) => ({
    input: {
        outline: 'none',
    }
}));