import { useState } from 'react'
import "./ModalSuccess.css"
import { Modal, Button } from 'react-bootstrap'

export default function ModalSuccess(props) {
    const userInfor= JSON.parse(localStorage.getItem("dataQR"))

    const [valueModal, setValueModal] = useState({
        email: "",
        phoneNumber: "",
        address: ""
    })

    const onChange = e => {
        const newValue = e.target.value
        const field = e.target.name
        setValueModal(prev => {
            return {
                ...prev,
                [field] : newValue
            }
        })
    }

    return (
        <Modal
            {...props} 
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            contentClassName='bg-modal text-white'
        >
            <Modal.Header>
                <Modal.Title>Đăng kí đặt hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex mb-2'>
                    <h5>Tên trên thẻ:</h5>
                    <h5 className='ms-3'>{userInfor === null ? "Tên người dùng" : userInfor.nameUser}</h5>
                </div>
                <div className='d-flex mb-2'>
                    <h5>Loại thẻ:</h5>
                    <h5 className='ms-3'>{userInfor === null ? "Thẻ cơ bản" : userInfor.colorCard}</h5>
                </div>
                <div className='d-flex flex-column'>
                    <h5>Vui lòng nhập các thông tin sau:</h5>
                    <div className='w-100 mb-2'>
                        <label className='form-label fs-6'>Email</label>
                        <input 
                            name="email"
                            type="text"
                            className='form-control' 
                            placeholder="Email"
                            value={valueModal.email}
                            onChange={onChange}
                        />
                    </div>
                    <div className='w-100 mb-2'>
                        <label className='form-label fs-6'>Số điện thoại</label>
                        <input 
                            name="phoneNumber"
                            type="text"
                            className='form-control' 
                            placeholder='Số điện thoại nhận hàng'
                            value={valueModal.phoneNumber}
                            onChange={onChange}
                        />
                    </div>
                    <div className='w-100 mb-2'>
                        <label className='form-label fs-6'>Địa chỉ nhận hàng</label>
                        <input 
                            name="address"
                            type="text"
                            className='form-control' 
                            placeholder='Địa chỉ nhận hàng cụ thể, rõ ràng'
                            value={valueModal.address}
                            onChange={onChange}
                        />
                    </div>
                </div> 
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.onHide}>
                    Mua
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
