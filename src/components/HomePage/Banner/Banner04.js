import React, { useContext, useEffect, useState, useRef } from 'react'
import "./Banner04.css"
import cardType from '../../../data/dataCard'
import InforScan from '../../InforScan/InforScan'
import QRCode from "qrcode.react"
import logoScan from "../../../assets/logo_scan.png"
import { useParams } from 'react-router-dom'
import AuthContext from '../../../context/auth'
import {Dropdown, FormControl, InputGroup, DropdownButton, Modal, Button } from "react-bootstrap"
import socialNetWork from '../../../data/socialNetWork'
import ModalSuccess from '../Modal/ModalSuccess'

export default function Banner04() {
    const authCtx = useContext(AuthContext)
    const [selectedImg, setSelectedImg] = useState(cardType[0].src)
    const [selectedNameCard, setSelectedNameCard] = useState(cardType[0].name)
    
    const [name, setName] = useState("")
    const [avatarUrl, setAvatarUrl] = useState()
    const [socialName, setSocialName] = useState(socialNetWork[0].name)
    const [socials, setSocials] = useState([
        {socialName: socialName, socialLink: ""},
    ])
    console.log(socialName);
    const toggle = (name) => {
        setSocialName(name)
    }

    // const renderName = ()  => () => {
    //     let title
    //     if(socialName.length !== 0) {
    //         socialNetWork.map((items) => {
    //             for(let data of socialName) {
    //                 if(items.name === data.name) {
    //                     title = items.name
    //                 }
    //             }
    //         })
    //     } else {
    //         title = socialName[0].name
    //     }
    //     return title
    // }

    const [imageQRcode, setImageQRcode] = useState("")

    const [data, setData] = useState(() => {
        const storageInfoQR = JSON.parse(localStorage.getItem("dataQR"))

        return storageInfoQR
    })


    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    useEffect(() => {
        return () => {
            avatarUrl && URL.revokeObjectURL(avatarUrl.preview)
        }
    },[avatarUrl])

    const onChangeAvatar = (e) => {
        const fileAvatar = e.target.files[0]

        fileAvatar.preview = URL.createObjectURL(fileAvatar)

        setAvatarUrl(fileAvatar) 
    }

    const handleChangeSocial = (id, e) => {
        console.log(e.target.value);
        const values = [...socials]
        values[id][e.target.name] = e.target.value
        setSocials(values)
    }

    const handleAddSocial = () => {
        setSocials([...socials, {socialName:socialName, socialLink: ""}])
    }

    useEffect(() => {
        setImageQRcode(`http://localhost:3000/thong-tin-scan/${authCtx.user.id}`)
    },[data])

    const onSubmitForm = (event) => {
        event.preventDefault()
        
        setData(() => {
            const newData = {
                nameUser: name,
                avatarUrl: avatarUrl.preview,
                nameCard: selectedImg,
                colorCard: selectedNameCard,
                qrImage: imageQRcode,
                social: socials
            }
            const jsonData = JSON.stringify(newData)
            localStorage.setItem("dataQR", jsonData)
        })
    }

    return (
        <>
            <div className='container m-5'>
                <div className='d-flex flex-column align-items-center'>
                    <h2 className='banner__heading text-dark fw-bold'>
                        Infor card
                    </h2>
                    <h2 className='banner__heading text-dark fw-bold'>
                        Thẻ cá nhân thông minh
                    </h2>
                </div>
                <div className='d-flex gap-5'>
                    <div className='demo-card'>
                        <img src={selectedImg} className='demo-card-img'/>
                        {/* <img src={imageQRcode} className="demo-card-qr"/> */}
                        <QRCode 
                            className="demo-card-qr"  
                            size={100}
                            // value={`http://localhost:3000/thong-tin-scan/${authCtx.user.id}`}
                            value={imageQRcode ? imageQRcode : "NA"}
                            bgColor={"#f7f7f7"}
                            fgColor={"#000000"}
                            level={"L"}
                            includeMargin={false}
                            renderAs={"svg"}
                            // imageSettings={{
                            //     src: logoScan,
                            //     x: null,
                            //     y: null,
                            //     height: 24,
                            //     width: 24,
                            //     excavate: true,
                            // }}
                        /> 
                        <h6 className='demo-card-name'>{name}</h6>
                    </div>
                    <div className='d-flex flex-column align-items-start form-demo-card'>
                        <form className='w-100' onSubmit={onSubmitForm}>
                            <div className='d-flex fw-bold fs-5 mb-3'>
                                <span>Loại thẻ:</span>
                                <span className='ms-3'>{selectedNameCard}</span>
                            </div>
                            <div className='d-flex fw-bold fs-5 mb-3'>
                                <span>Màu sắc:</span>
                                <div className='d-flex'>
                                    {cardType.map((img, index) => (
                                        <div className='cursor-pointer card-type'>
                                            <img key={index} 
                                                src={img.src} 
                                                className='card-demo-luxury ms-3'
                                                onClick={() => {setSelectedImg(img.src)
                                                    setSelectedNameCard(img.name)}}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='d-flex w-100 gap-2 mb-3'>
                                <div className='w-100'>
                                    <label className='form-label fw-bold fs-5'>Tên của bạn</label>
                                    <input 
                                        name="nameUser"
                                        type="text"
                                        className='form-control' placeholder='Nhập tên của bạn'
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        // onFocus={e => setName(e.target.name)}
                                    />
                                </div>
                                <div className='w-100'>
                                    <label className='form-label fw-bold fs-5'>Avatar</label>
                                    <input 
                                        className='form-control' 
                                        placeholder='Nhập tên của bạn' 
                                        type="file"
                                        name="avatarUrl"
                                        onChange={onChangeAvatar}
                                        // onFocus={e => setDateOfBirth(e.target.name)}
                                    />
                                </div>
                            </div>
                            {/* <div className='mb-3 w-100'>
                                <label className='form-label fw-bold fs-5'>Social Network</label>
                                <input 
                                    className='form-control' 
                                    placeholder='Nhập tên của bạn' 
                                    type="file"
                                    name="avatarUrl"
                                    onChange={onChangeAvatar}
                                    // onFocus={e => setDateOfBirth(e.target.name)}
                                />
                            </div> */}
                            <div className='w-100 d-flex flex-column align-items-end'>
                                {socials.map((social, idx) => (
                                    <>
                                    <InputGroup className="mb-3" key={idx}>
                                        <DropdownButton
                                            variant="outline-secondary"
                                            // title={renderName}
                                            title={socialName}
                                        >
                                            {socialNetWork.map((items, idx) => (
                                                <Dropdown.Item 
                                                    key={idx} 
                                                    href="#" 
                                                    // onClick={() => {
                                                    //     let result=socialName
                                                    //     result.push({
                                                    //         name: items.name,
                                                    //         id: idx
                                                    //     })
                                                    // }}
                                                    onClick={() => {setSocialName(items.name)}}
                                                    // onClick={() => toggle(items.name)}
                                                >
                                                    {items.name}
                                                </Dropdown.Item>
                                                
                                            ))}
                                        </DropdownButton>
                                        <FormControl 
                                            name="socialLink" 
                                            value={social.socialLink} 
                                            onChange={e => handleChangeSocial(idx, e)}
                                        />
                                    </InputGroup>
                                    {socials.length - 1 === idx && 
                                        <button 
                                            className='btn btn-primary' 
                                            onClick={handleAddSocial}
                                        >
                                            Thêm mạng xã hội
                                        </button>
                                    }
                                    </>
                                ))}
                            </div>
                            {/* {imageUrlAvatar && <img src={imageUrlAvatar.preview} width="20%" height="20%"/>} */}
                            <div className='d-flex justify-content-between align-items-center w-100'>
                                <div className='d-flex'>
                                    <p className='fw-bold fs-3 '>159,000đ</p>
                                    <p className='ms-3 fw-bold fst-italic fs-3 text-secondary text-decoration-line-through'>
                                        259,000đ
                                    </p>
                                </div>
                                <h6 className='fw-bold'>Freeship toàn quốc</h6>
                            </div>
                            <button className='btn btn-primary' onClick={handleShowModal}>Đặt mua</button>
                            <ModalSuccess show={showModal} onHide={handleCloseModal} handleCloseModal={handleCloseModal}/>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}
