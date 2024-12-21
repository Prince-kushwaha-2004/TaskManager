
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Outlet } from 'react-router-dom';
export default function RootLayout() {
    return (
        <div className="flex w-full  justify-center h-screen bg-white">
            <div className="logo flex gap-4 items-center absolute top-4 left-4">
                <img src="https://user-images.githubusercontent.com/69080584/119517399-c6f10280-bda1-11eb-9af9-4bdc197dcd65.png" className="w-12" alt="logo" />
                <h1 className="text-4xl font-bold text-slate-900">TaskMaster</h1>
            </div>
            <div className='w-0 lg:w-1/2 xl:w-2/3 bg-gradient-to-r from-cyan-100 to-blue-200 flex justify-center items-center'>
                <DotLottieReact
                    className='w-full '
                    src="https://lottie.host/b50cb934-5258-462a-94e0-0c406a31e2fd/PFrkkPzOl1.json"
                    loop
                    autoplay
                />
            </div>
            <Outlet />
        </div>
    )
}
