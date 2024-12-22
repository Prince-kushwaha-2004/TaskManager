import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Header from '../header/Header';
import Nav from '../nav/Nav';
const Manager = () => {
    const nav = [
        {
            title: "Dashboard",
            link: "dashboard"
        },
        {
            title: "Users Permissions",
            link: "permissions"
        }
    ]
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate()
    useEffect(() => {
        if (userData.id == undefined) {
            navigate("/")

        } else if (userData.role != "manager") {
            toast.error('Access Denied');
            navigate(-1)
        }
    }, [])
    return (
        <UserContext.Provider value={{ user: "Manager", nav: nav }}>
            <div className='width-screen height-screen'>
                <Header />
                <Nav />
                <main className='m-4 lg:mx-60 flex flex-col h-[800px] overflow-auto no-scrollbar gap-4 '>
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

export default Manager