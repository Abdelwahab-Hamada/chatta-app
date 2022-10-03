import { Routes, Route,Outlet } from 'react-router-dom';

import Login from "./pages/Login";
import Chats from './pages/Chats';
import Users from './pages/Users';
import Register from './pages/Register';

import Nav from './components/Nav';

import RequireAuth from './components/RequireAuth';

import Home from './pages/Home';

function App(){

    return (
        <>
            <div className='border-x-2 relative p-5 text-slate-500 font-mono overflow-hidden w-full h-screen md:w-8/12 lg:w-4/12 mx-auto'>
                <Nav/>
                <Routes>
                    <Route path="chatta-app/" element={<Outlet />}>
                        <Route path="login/" element={<Login />} />
                        <Route path="register/" element={<Register />} />
                        <Route path="" element={<Home />} />
                        
                        
                        <Route element={<RequireAuth />}>
                            <Route path="chats/" element={<Chats />} />
                            <Route path="users/" element={<Users />} />
                        </Route>

                    </Route>
                </Routes>
            </div>
        </>
    )
}

export default App