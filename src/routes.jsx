import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function MainRoutes() {
    return (
        <Routes>
            <Route path='/'>
                <Route path='/' element={<SignIn />} />
                <Route path='/sign-in' element={<SignIn />} />
            </Route>
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
    )
}

export default MainRoutes;