import { useContext, useEffect, useState } from 'react'
import "./Banner05.css"
import cardType from '../../../data/dataCard'
import QRCode from "qrcode.react"
import AuthContext from '../../../context/auth'
import {Dropdown, FormControl, InputGroup, DropdownButton, Button } from "react-bootstrap"
import socialNetWork from '../../../data/socialNetWork'
import ModalSuccess from '../Modal/ModalSuccess'

export default function Banner05() {
    const authCtx = useContext(AuthContext)
    const [selectedImg, setSelectedImg] = useState(cardType[0].src)
    const [selectedNameCard, setSelectedNameCard] = useState(cardType[0].name)
    const [imageQRcode, setImageQRcode] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("")
    const [avatarUrl, setAvatarUrl] = useState()
    const [listSocials, setListSocials] = useState([])
    const [socialName, setSocialName] = useState('')
    const [socialLink, setSocialLink] = useState('')
    const [data, setData] = useState(() => {
        const storageInfoQR = JSON.parse(localStorage.getItem("dataQR"))
        return storageInfoQR
    })

    const onChangeAvatar = e => {
        const fileAvatar = e.target.files[0]
        fileAvatar.preview = URL.createObjectURL(fileAvatar)
        setAvatarUrl(fileAvatar)
    }

    const handleChangeSocial = e => {
        setSocialLink(e.target.value)
    }

    const handleSelect = name => {
        setSocialName(name)
    }

    const onAddSocial = e => {
        e.preventDefault()
        setListSocials([
            ...listSocials,
            { 
                name: socialName,
                link: socialLink
            }
        ])
        setSocialName('')
        setSocialLink('')
    }

    const onSubmitForm = e => {
        e.preventDefault()
        setData(() => {
            const newData = {
                nameUser: name,
                avatarUrl: avatarUrl.preview,
                nameCard: selectedImg,
                colorCard: selectedNameCard,
                qrImage: imageQRcode,
                social: listSocials
            }
            const jsonData = JSON.stringify(newData)
            localStorage.setItem("dataQR", jsonData)
        })
    }

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        return () => avatarUrl && URL.revokeObjectURL(avatarUrl.preview)
    }, [avatarUrl])

    useEffect(() => {
        setImageQRcode(`http://localhost:3000/thong-tin-scan/${authCtx.user.id}`)
    }, [data])

    return (
        <div className='container mt-5'>
            <div className='text-center'>
                <h2 className='banner__heading text-dark fw-bold'>
                    Infor card<br />Thẻ cá nhân thông minh
                </h2>
            </div>
            <div className='d-flex'>
                <div className='demo-card'>
                    <img src={selectedImg} className='demo-card-img' alt='iimg'/>
                    <QRCode 
                        className="demo-card-qr"  
                        size={100}
                        value={imageQRcode ? imageQRcode : "NA"}
                        bgColor={"#f7f7f7"}
                        fgColor={"#000000"}
                        level={"L"}
                        includeMargin={false}
                        renderAs={"svg"}
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
                                    <div className='cursor-pointer card-type' key={index}>
                                        <img 
                                            src={img.src} 
                                            className='card-demo-luxury ms-3'
                                            alt='img'
                                            onClick={() => {
                                                setSelectedImg(img.src)
                                                setSelectedNameCard(img.name)
                                            }}
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
                                    className='form-control' 
                                    placeholder='Nhập tên của bạn'
                                    value={name}
                                    onChange={e => setName(e.target.value)}
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
                                />
                            </div>
                        </div>
                        <div className='w-100 d-flex flex-column align-items-end'>
                            {
                                listSocials.map((item, idx) => {
                                    return (
                                        <div key={idx} className='w-100 d-flex flex-row mt-1'>
                                            <Button disabled className='btn-social-disable'>{item.name}</Button>
                                            <input 
                                                type='text' 
                                                value={item.link} 
                                                disabled 
                                                className='w-100 ms-1 form-control'
                                            />
                                        </div>
                                    )
                                })
                            }
                            <div className="mb-3 w-100">
                                <InputGroup className='mt-3'>
                                    <DropdownButton
                                        variant="outline-secondary"
                                        title={socialName || 'Choose'}
                                        onSelect={handleSelect}
                                    >
                                        {socialNetWork.map(item => (
                                            <Dropdown.Item 
                                                key={item.id} 
                                                eventKey={item.name}
                                            >
                                                {item.name}
                                            </Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                    <FormControl 
                                        name="socialLink" 
                                        value={socialLink} 
                                        onChange={handleChangeSocial}
                                    />
                                </InputGroup>
                                
                                <button 
                                    className='btn btn-primary mt-3' 
                                    onClick={onAddSocial}
                                >
                                    Thêm Link cá nhân
                                </button>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center w-100'>
                            <div className='d-flex'>
                                <p className='fw-bold fs-3 '>159,000đ</p>
                                <p className='ms-3 fw-bold fst-italic fs-3 text-secondary text-decoration-line-through'>
                                    259,000đ
                                </p>
                            </div>
                            <h6 className='fw-bold'>Freeship toàn quốc</h6>
                        </div>
                        <button 
                            onClick={handleShowModal}
                            className='btn btn-primary'
                        >
                            Đặt mua
                        </button>
                        <ModalSuccess
                            show={showModal}
                            onHide={handleCloseModal}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}
