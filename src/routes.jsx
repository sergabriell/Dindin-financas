import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { getItem } from './utils/localStorage';

function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = getItem('token');

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

function MainRoutes() {

    return (
        <Routes>
            <Route path='/'>
                <Route path='/' element={<SignIn />} />
                <Route path='/sign-in' element={<SignIn />} />
            </Route>

            <Route path='/sign-up' element={<SignUp />} />

            <Route element={<ProtectedRoutes redirectTo='/' />}>
                <Route path='/dashboard' element={<Dashboard />} />
            </Route>
        </Routes>

    )
}

export default MainRoutes;