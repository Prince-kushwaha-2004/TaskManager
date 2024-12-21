import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
const Root = () => {
    return (

        <main className="bg-gradient-to-r from-cyan-100 to-blue-200 h-screen w-screen overflow-hidden ">
            <Toaster />
            <Outlet />
        </main>
    )
}

export default Root