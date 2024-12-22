import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import { Outlet } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Header from '../header/Header';
import Nav from '../nav/Nav';
const User = () => {
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate();
    console.log(userData.id)
    useEffect(() => {
        if (userData.id == undefined) {
            navigate("/")

        } else if (userData.role != "user") {
            toast.error('Access Denied');
            navigate(-1)
        }
    }, [])

    const nav = [
        {
            title: "Dashboard",
            link: "dashboard"
        },
        {
            title: "ToDo",
            link: "todo"
        }
    ]

    return (
        <UserContext.Provider value={{ user: "prince", nav: nav }}>
            <div className='width-screen height-screen'>
                <Header />
                <Nav />
                <main className='m-4 xl:mx-60 flex flex-col h-[800px] overflow-auto no-scrollbar gap-4 '>
                    <div className='flex w-full gap-4'>
                        <div className='w-full mt-12 '>
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </UserContext.Provider>
    )
}

export default User