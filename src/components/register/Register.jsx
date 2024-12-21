import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import { apicall } from '../../../utils/services';
import { validate } from '../../../utils/validation';
const Register = () => {
    const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', cpassword: '' })
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const handleinput = (event) => {
        setRegisterData({
            ...registerData,
            [event.target.name]: event.target.value
        })
    }
    const register = (event) => {
        event.preventDefault()
        const namevalid = validate("name", registerData.name)
        const emailvalid = validate("email", registerData.email)
        const passwordvalid = validate("password", registerData.password)
        if (!namevalid.valid) {
            toast.error(namevalid.message, {
                position: "top-right"
            })
        } else if (!emailvalid.valid) {
            toast.error(emailvalid.message, {
                position: "top-right"
            })
        } else if (!passwordvalid.valid) {
            toast.error(passwordvalid.message, {
                position: "top-right"
            })
        }
        else if (registerData.password != registerData.cpassword) {
            toast.error("Password does not match", {
                position: "top-right"
            })
        } else {
            console.log(registerData)
            let data = {
                "name": registerData.name,
                "email": registerData.email,
                "password": registerData.password,
                "role": "user",
                "permissions": [
                    "add",
                    "delete",
                    "update",
                    "done"
                ]
            }
            apicall("post", "user", data, '', (data) => {
                toast.success("User Created Successfully")
                console.log(data)
                navigate('/')
            })
        }
    }
    return (

        <div className='w-full lg:w-1/2 xl:w-1/3 my-auto  md:px-8 bg-white'>
            <form className="flex gap-4 flex-col mx-auto p-16 w-full" onSubmit={register}>
                <h1 className="text-4xl sm:text-5xl  font-bold text-slate-800">Welcome Back!</h1>
                <p className='text-xl font-medium text-gray-500 mb-8'>Create your acount</p>
                <div>
                    <label htmlFor="name" className='text-xl font-medium text-gray-700 '>Name</label>
                    <input id='name' className="border font-medium border-slate-400 w-full text-xl p-2 px-4 gap-2 rounded-md focus:outline-blue-400" type="text" required name='name' onChange={handleinput} placeholder="Name" />
                </div>
                <div>
                    <label htmlFor="email" className='text-xl font-medium text-gray-700 '>Email</label>
                    <input id='email' className="border font-medium border-slate-400 w-full text-xl p-2 px-4 gap-2 rounded-md focus:outline-blue-400" type="email" required name='email' onChange={handleinput} placeholder="Email" />
                </div>
                <div>
                    <label htmlFor="password" className='text-xl font-medium text-gray-700 '>Password</label>
                    <input id='password' className="border font-medium border-slate-400 w-full text-xl p-2 px-4 gap-2 rounded-md focus:outline-blue-400" type="password" required name='password' onChange={handleinput} placeholder="Password" />
                </div>
                <div>
                    <label htmlFor="cpassword" className='text-xl font-medium text-gray-700 '>Confirm Password</label>
                    <input id='cpassword' className="border font-medium border-slate-400 w-full text-xl p-2 px-4 gap-2 rounded-md focus:outline-blue-400" type="password" required name='cpassword' onChange={handleinput} placeholder="Confirm Password" />
                </div>
                <button type="submit" className="bg-blue-600 text-white rounded p-2 mt-12 text-2xl">Register</button>
                <p className="p-2 text-xl text-gray-500 text-center">Already have an account? <Link to="/" className="font-medium text-blue-500 underline">Login</Link></p>
                <p className="text-xl text text-red-500 text-center">{error}</p>
            </form>
        </div>


    )
}

export default Register