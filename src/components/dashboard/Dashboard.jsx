import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useSelector } from 'react-redux';
const Dashboard = () => {
    const { userData } = useSelector(state => state.user)
    console.log("dashboard", userData)
    // const data = useContext(UserContext);
    return (
        <>
            <h1 className='text-3xl sm:text-6xl text-slate-900 text-right  mt-4 font-bold '>Hello {userData.name} !!</h1>
            <h1 className='text-3xl sm:text-6xl text-slate-900 text-right mt-4 font-bold '> Welcome to Task Manager</h1>
            <DotLottieReact
                className='w-full sm:w-2/3 absolute right-0 bottom-0'
                src="https://lottie.host/ed401373-62e1-4500-a651-c2c3ae33adde/ygpkXUQKZA.lottie"
                loop
                autoplay
            />
        </>
    )
}

export default Dashboard