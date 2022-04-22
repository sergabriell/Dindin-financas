import { Routes, Route } from 'react-router-dom';
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
        </Routes>
    )
}

export default MainRoutes;