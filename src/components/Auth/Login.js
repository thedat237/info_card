import React, { useState, useContext } from 'react'
import "./Login.css"
import bannerPeople from "../../assets/banner_people_card.jfif"
import axios from "../../util/http"
import AuthContext from '../../context/auth'
import { Navigate } from 'react-router-dom'

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const authCtx = useContext(AuthContext)

    const loginGoogle = () => window.open(`${process.env.REACT_APP_OAUTH_URL}/auth/google`, '_self')
    const loginGithub = () => window.open(`${process.env.REACT_APP_OAUTH_URL}/auth/github`, '_self')

    const onLoginSubmit = async e => {
        e.preventDefault()
        try{
            const response = await axios.post("/auth/login", {
                username: username,
                password: password
            })
            authCtx.setUser(response.data.user)
            // console.log(response);
            // localStorage.setItem("token", response.data.token)
            // addJwt(response.data.token)
        } catch (err) {
            alert("Wrong username or password")
        }
    }

    if(authCtx.user) {
        return <Navigate to={`/`} replace={true} />
    }

    return (
        <div className='bg-auth'>
            <section className='Form'>
                <div className='container py-3'>
                    <div className='row '>
                        <div className='col-lg-5 p-0'>
                            <img src={bannerPeople} className='img-fluid login-img' alt='img'/>
                        </div>
                        <div className='col-lg-7 mt-3'>
                            <h1 className='fw-bold py-3'>Login</h1>
                            <h4>Sign into your account</h4>
                            <form className='my-5' onSubmit={onLoginSubmit}> 
                                <div className='form-row'>
                                    <div className='col-lg-7'>
                                        <input  
                                            placeholder='Email-Address'
                                            className='form-control my-3 p-3'
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='form-row mb-5'>
                                    <div className='col-lg-7'>
                                        <input type="password" 
                                            placeholder='******' 
                                            className='form-control my-3 p-3'
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='form-row'>
                                    <div className='col-lg-7'>
                                        <button className='btn1'>
                                            Login
                                        </button>
                                    </div>
                                </div>
                                <p>Dont't have an account? <a href='/register'>Register here</a></p>
                            </form>
                            <div>
                                <div onClick={loginGoogle}>
                                    Login With Google
                                </div>
                                <div onClick={loginGithub}>
                                    Login With Github
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
