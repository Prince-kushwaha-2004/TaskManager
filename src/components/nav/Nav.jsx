import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Nav = () => {
    const data = useContext(UserContext);
    const navlink = data.nav.map((d) => {
        return (
            <div key={d.title} className='flex gap-2 mx-auto'>
                <Link to={d.link} className="text-2xl text-slate-800 hover:text-blue-600">{d.title}</Link>
            </div>
        )
    })
    return (
        <>
            <nav className='p-4 m-auto flex rounded-2xl shadow border bg-gradient-to-r from-slate-100 to-blue-50 w-96 px-auto  gap-8'>
                {navlink}
            </nav>
        </>
    )
}

export default Nav