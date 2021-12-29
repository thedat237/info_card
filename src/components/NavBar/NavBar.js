import React, {useContext} from 'react'
import "./NavBar.css"
import logo from "../../assets/banner_logo.png"
import { Button } from 'react-bootstrap'
import {Link, Navigate, NavLink, useNavigate, useParams} from "react-router-dom"
import AuthContext from '../../context/auth'
import RequireAuth from '../Auth/RequireAuth'

export default function NavBar() {
    const authCtx = useContext(AuthContext)

    const logOut = () => {
        localStorage.clear()
    }

    return (
        <div className="d-flex align-items-center">
            <div className='container'>
                <div className="d-flex justify-content-between align-items-center header-navbar-menu p-3 nav-bar">
                    <NavLink to='/' className='header-logo '>
                        <img src={logo} className='logo-img'/>
                    </NavLink>

                    {/* <RequireAuth mode="hidden"> */}
                    {authCtx.user ? 
                        <>
                            <ul class="header-menu is-active m-0">
                                <li class="header-menu-item">
                                    <Link to="/gioi-thieu" className="header-menu-link text-decoration-none fw-bold fs-6">
                                        Giới thiệu
                                    </Link>
                                </li>
                                <li class="header-menu-item">
                                    <Link to="/huong-dan" className="header-menu-link text-decoration-none fw-bold fs-6">Hướng dẫn</Link>
                                </li>
                                <li class="header-menu-item">
                                    <Link to={`/tao-the/${authCtx.user.id}`} className="header-menu-link text-decoration-none fw-bold fs-6">Tạo thẻ</Link>
                                </li>
                                <li class="header-menu-item">
                                    <Link to={`/thong-tin-scan/${authCtx.user.id}`} className="header-menu-link text-decoration-none fw-bold fs-6">Thông tin thẻ</Link>
                                </li>
                            </ul>
                            {/* <span>{authCtx.user.username}</span> */}
                            <div className='p-2 bg-dark text-white rounded'>
                                {authCtx.user.username}
                            </div>
                        </>
                        :
                        <>
                            <ul class="header-menu is-active m-0">
                                <li class="header-menu-item">
                                    <Link to="/gioi-thieu" className="header-menu-link text-decoration-none fw-bold fs-6">
                                        Giới thiệu
                                    </Link>
                                </li>
                                <li class="header-menu-item">
                                    <Link to="/huong-dan" className="header-menu-link text-decoration-none fw-bold fs-6">Hướng dẫn</Link>
                                </li>
                                <li class="header-menu-item">
                                    {/* <RequireAuth mode="navigate"> */}
                                        <Link to="/login" className="header-menu-link text-decoration-none fw-bold fs-6">Tạo thẻ</Link>
                                    {/* </RequireAuth> */}
                                </li>
                                <li class="header-menu-item">
                                    <Link to="/login" className="header-menu-link text-decoration-none fw-bold fs-6">Thông tin thẻ</Link>
                                </li>
                            </ul>
                            <NavLink to="/login" className="text-decoration-none">
                                <button className='btn btn-primary'>Tạo thẻ</button>
                            </NavLink>
                        </>
                    }
                    {/* </RequireAuth> */}
                </div>
            </div>
        </div>
    )
}