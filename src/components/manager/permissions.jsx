import { useEffect, useState } from "react";
import { apicall } from '../../../utils/services';
const Permissions = () => {
    const [alluser, setAlluser] = useState([])
    const getuser = () => {
        apicall("get", 'user', '', { role: "user" }, (data) => {
            setAlluser(data)
        })
    }
    const handlechange = (event) => {
        apicall("get", 'user', '', { role: "user", id: event.target.id }, (data) => {
            if (data[0].permissions.includes(event.target.value)) {
                let permissions = data[0].permissions
                permissions = permissions.filter((value) => {
                    return value != event.target.value
                })
                apicall("patch", `user/${event.target.id}`, { permissions: permissions }, '', (data) => {
                    getuser()
                })
            } else {
                let permissions = data[0].permissions
                permissions.push(event.target.value)
                apicall("patch", `user/${event.target.id}`, { permissions: permissions }, '', (data) => {
                    getuser()
                })
            }
        })
    }
    useEffect(() => {
        getuser()
    }, [])

    return (
        <>
            <h1 className='text-4xl text-slate-900 text-right  my-4 font-bold '>Manage User's permitions</h1>
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
                            <div className="options flex gap-2 justify-center items-center font-medium text-xl text-slate-900">
                                <input type="checkbox" value="create" checked={d.permissions.includes("create")} onChange={handlechange} id={d.id} />
                                <label htmlFor={d.id}>Create</label>
                                <input type="checkbox" value="update" checked={d.permissions.includes("update")} onChange={handlechange} id={d.id} />
                                <label htmlFor={d.id}>Update</label>
                                <input type="checkbox" value="delete" checked={d.permissions.includes("delete")} onChange={handlechange} id={d.id} />
                                <label htmlFor={d.id}>Delete</label>
                            </div>
                        </div>
                    )
                })}

            </div>
        </>
    )
}

export default Permissions