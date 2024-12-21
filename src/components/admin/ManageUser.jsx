import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { apicall } from '../../../utils/services';
const ManageUser = () => {
    const [alluser, setAlluser] = useState([])
    const getuser = () => {
        apicall("get", 'user', '', '', (data) => {
            data = data.filter((d) => {
                return d.role != "admin"
            })
            setAlluser(data)
        })
    }
    useEffect(() => {
        getuser()
    }, [])

    const changeRole = (e) => {
        console.log(e.target.id)
        apicall('patch', `user/${e.target.id}`, { role: e.target.value }, '', (data) => {
            toast.success("Role change successfully")
            getuser()
        })
    }
    return (
        <>
            <h1 className='text-4xl text-slate-900 text-right  my-4 font-bold '>Manage Users</h1>
            <div className="flex flex-col gap-4 w-full">
                {alluser.map((d) => {
                    return (
                        <div key={d.id} className="flex w-full flex-wrap gap-8 justify-between bg-gradient-to-r from-blue-50 to-blue-100 border shadow rounded-3xl p-4 items-center">
                            <div className="flex gap-4 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <p className="font-bold text-slate-900 text-3xl">{d.name}</p>
                                    <p className="text-slate-800 text-xl">{d.email}</p>
                                </div>
                            </div>
                            <div className="dropdown" >
                                <select name="roles" id={d.id} value={d.role} onChange={changeRole} className="p-2 border-none focus:outline-none shadow bg-blue-500 text-white rounded  active:outline-none *:bg-white *:text-black">
                                    <option value="user" disabled={d.role == "user"}>User</option>
                                    <option value="manager" disabled={d.role == "manager"}>Manager</option>
                                </select>

                            </div>
                        </div>
                    )
                })}

            </div>
        </>
    )
}

export default ManageUser