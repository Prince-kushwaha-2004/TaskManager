import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Header from '../header/Header';
import Nav from '../nav/Nav';
const Admin = () => {
    const nav = [
        {
            title: "Dashboard",
            link: "dashboard"
        },
        {
            title: "Manage Users",
            link: "manageUser"
        }
    ]
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate()
    useEffect(() => {
        if (userData.id == undefined) {
            navigate("/")

        } else if (userData.role != "admin") {
            toast.error('Access Denied');
            navigate(-1)
        }
    }, [])
    return (
        <UserContext.Provider value={{ user: "Admin", nav: nav }}>
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

export default Admin