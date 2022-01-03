import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../../context/auth'
import RequireAuth from '../Auth/RequireAuth'
import Banner01 from './Banner/Banner01'
import Banner02 from './Banner/Banner02'
import Banner03 from './Banner/Banner03'
import Banner04 from './Banner/Banner04'
import Banner05 from './Banner/Banner05'

export default function HomePage() {
    const authCtx = useContext(AuthContext)
    
    return (
        <div>
            <Banner01 />
            <Banner02 />
            <Banner03 />
            <Banner04 />
            <RequireAuth mode="hidden">
                <Banner05 />
            </RequireAuth>
            {
                authCtx.user ? 
                null : 
                <div className='d-flex justify-content-center container mb-3'>
                    <NavLink to="/login">
                        <button className='btn btn-primary w-100 mt-5'>Đặt mua</button>
                    </NavLink>
                </div>
            }
        </div>
    )
}
