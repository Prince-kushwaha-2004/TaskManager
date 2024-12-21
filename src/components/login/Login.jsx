import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import { apicall } from '../../../utils/services';
import { loginUser } from '../../features/user/userSlice';
const Login = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '' })
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const handlechange = (event) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        })
    }
    const handleLogin = (event) => {
        event.preventDefault()
        apicall('get', 'user', '', '', (data) => {
            const user = data.filter((value) => {
                return value.email == loginData.email
            })
            if (!user.length) {
                toast.error("No user exist");
            } else if (loginData.password != user[0].password) {
                toast.error("Wrong Password");
            } else {
                dispatch(loginUser(user[0]))
                if (user[0].role == 'manager') {
                    navigate('/manager');
                    toast.success("login successfull")
                } else if (user[0].role == 'admin') {
                    navigate('/admin');
                    toast.success("login successfull")
                } else {
                    navigate('/user');
                    toast.success("login successfull")
                }

            }

        })
    }
    return (

        <div className='w-full lg:w-1/2 xl:w-1/3 my-auto  md:px-8 bg-white'>
            <form className="flex gap-4 flex-col mx-auto p-16 w-full" onSubmit={handleLogin}>
                <h1 className="text-4xl sm:text-5xl  font-bold text-slate-800">Welcome Back !</h1>
                <p className='text-xl font-medium text-gray-500 mb-8'>Sign into your acount</p>
                <div>
                    <label htmlFor="email" className='text-xl font-medium text-gray-700 '>Email</label>
                    <input id='email' className="border font-medium border-slate-400 w-full text-xl p-2 px-4 gap-2 rounded-md focus:outline-blue-400" name="email" value={loginData.email} onChange={handlechange} required type="email" placeholder="Email" />
                </div>
                <div>
                    <label htmlFor="password" className='text-xl font-medium text-gray-700 '>Password</label>
                    <input id='password' className="border font-medium border-slate-400 w-full text-xl p-2 px-4 gap-2 rounded-md focus:outline-blue-400" name="password" value={loginData.password} onChange={handlechange} required type="password" placeholder="Password" />
                </div>
                <button className="bg-blue-600 text-white rounded p-2 mt-12 text-2xl" type="submit">Login</button>
                <p className="p-2 text-xl text-gray-500 text-center">Don't have an account? <Link to="/register" className="font-medium text-blue-500 underline">Create one</Link></p>
            </form>
        </div>

    )
}

export default Login