import Header from '../header/Header'
import { Outlet } from 'react-router-dom';
import Nav from '../nav/Nav'
import { UserContext } from '../../context/UserContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Manager = () => {
    const nav = [
        {
            title: "Dashboard",
            link: ""
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
            console.log("go to login")
            navigate("/")
        }
    })
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