import { useContext, useState } from 'react'
import "./NavBar.css"
import logo from "../../assets/banner_logo.png"
import { Link, NavLink } from "react-router-dom"
import AuthContext from '../../context/auth'
import { FaBars, FaTimes } from 'react-icons/fa';
import { DropdownButton, Dropdown} from 'react-bootstrap'

export default function NavBar() {
    const authCtx = useContext(AuthContext)
    const [clicked, setClicked] = useState(false)

    const logout = () => {
        window.open(`${process.env.REACT_APP_OAUTH_URL}/auth/logout`, '_self')
        // authCtx = ''
    }

    return (
        <nav className="d-flex justify-content-between container navigation-bars">
            <Link to='/'>
                <img src={logo} className='logo-img' alt='img'/>
            </Link>
            {
                clicked === false ?
                <FaBars className='navigation-icons' onClick={() => setClicked(true)} /> :
                <FaTimes className='navigation-icons' onClick={() => setClicked(false)} />
            }
            <div className={clicked === false ? 'navigation-bars__menu' : 'navigation-bars__menu__click'}>
                <NavLink 
                    to="/gioi-thieu" 
                    className='navigation-bars__menu__navlink'
                >
                    Giới thiệu
                </NavLink>
                <NavLink 
                    to="/huong-dan" 
                    className='navigation-bars__menu__navlink'
                >
                    Hướng dẫn
                </NavLink>
                <NavLink 
                    to={authCtx.user ? `/tao-the/${authCtx.user._id}` : '/login'} 
                    className='navigation-bars__menu__navlink'
                >
                    Tạo thẻ
                </NavLink>
                <NavLink 
                    to={authCtx.user ? `/thong-tin-scan/${authCtx.user._id}` : '/login'} 
                    className='navigation-bars__menu__navlink'
                >
                    Thông tin thẻ
                </NavLink>
                {
                    authCtx.user ?
                    <DropdownButton
                        variant="outline-secondary"
                        title={authCtx.user.username}
                    >
                        <Dropdown.Item>
                            <NavLink to={`/profile/${authCtx.user._id}`} className='text-decoration-none'>Profile</NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <NavLink to={`/edit/${authCtx.user._id}`} className='text-decoration-none'>Edit Card</NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                    </DropdownButton>
                    :
                    <Link to="/login" className="text-decoration-none navigation-button">
                        <button className='btn btn-primary'>Tạo thẻ</button>
                    </Link>
                }
            </div>
        </nav>
    )
}