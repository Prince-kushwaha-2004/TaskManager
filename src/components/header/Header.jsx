import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import { UserContext } from '../../context/UserContext';
import { logoutUser } from '../../features/user/userSlice';
const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const logout = () => {
        toast.custom((t) => (
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">

                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                                Do you want to Logout!!
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-gray-200">
                    <button
                        onClick={() => {
                            dispatch(logoutUser())
                            navigate("/")
                            toast.dismiss(t.id)
                        }}
                        className="w-full border border-transparent rounded-none  p-4 flex items-center justify-center text-sm font-medium text-green-600 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Yes
                    </button>
                </div>
                <div className="flex border-l border-gray-200">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        No
                    </button>
                </div>
            </div>
        ))

    }
    const data = useContext(UserContext);
    const { userData } = useSelector(state => state.user)
    return (
        <header className="p-3 lg:px-60 flex justify-between text-slate-900">
            <div className="logo flex gap-4 items-center">
                <img src="https://user-images.githubusercontent.com/69080584/119517399-c6f10280-bda1-11eb-9af9-4bdc197dcd65.png" className="w-12" alt="logo" />
                <h1 className="text-4xl font-bold ">TaskMaster</h1>
            </div>
            <div className="flex gap-8 items-center">
                <div className="gap-2 hidden sm:flex">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                    </svg>
                    <p className="font-bold text-xl">{userData.name}</p>
                </div>
                <button className="bg-blue-500  text-white p-2 px-4 my-1 rounded active:bg-blue-600 hover:bg-blue-300 hover:text-black font-bold" onClick={logout}>Logout</button>
            </div>

        </header>

    )
}

export default Header