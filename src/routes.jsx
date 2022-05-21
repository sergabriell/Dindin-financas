import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { getItem } from './utils/localStorage';
import { ToastContainer } from 'react-toastify';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useLoading } from './hooks/useLoading';

function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = getItem('token');

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

function DontLogin({ redirectTo }) {
    const isAuthenticated = getItem('token');

    return isAuthenticated ? <Navigate to={redirectTo} /> : <Outlet />
}

function MainRoutes() {
    const { openLoading } = useLoading();

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openLoading}
            >
                <CircularProgress />
            </Backdrop>

            <ToastContainer />

            <Routes>
                <Route element={<ProtectedRoutes redirectTo='/' />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                </Route>

                <Route element={<DontLogin redirectTo='/dashboard' />}>
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route path='/'>
                        <Route path='/' element={<SignIn />} />
                        <Route path='/sign-in' element={<SignIn />} />
                    </Route>
                </Route>
            </Routes>
        </>

    )
}

export default MainRoutes;