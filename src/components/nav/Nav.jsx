import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Nav = () => {
    const data = useContext(UserContext);
    const navlink = data.nav.map((d) => {
        return (
            <div key={d.title} className='flex gap-2 mx-auto'>
                <NavLink to={d.link} className={({ isActive }) => {
                    return isActive ? "text-xl p-4 border-b-2 border-blue-600 text-blue-600" : "p-4 text-xl text-slate-800 hover:text-blue-600";
                }}>{d.title}</NavLink>
            </div>
        )
    })
    return (
        <>
            <nav className='m-auto flex overflow-hidden rounded-2xl shadow bg-gradient-to-r from-slate-100 to-blue-50 w-96 '>
                {navlink}
            </nav>
        </>
    )
}

export default Nav