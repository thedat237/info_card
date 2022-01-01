import "./InforScan.css"
import BannerInfoScan2 from "../../assets/banner_info_scan2.png"
import QRCode from "qrcode.react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default function InforScan(props) {
    const userInfor= JSON.parse(localStorage.getItem("dataQR"))
    console.log(userInfor.social);

    return (
        <div className='container d-flex justify-content-between align-items-center'>
            <div className='demo-card'>
                <img src={userInfor.nameCard} className='demo-card-img' alt="img"/>
                <QRCode 
                    className="scanned-qr"  
                    size={100}
                    value={userInfor.qrImage}
                    bgColor={"#f7f7f7"}
                    fgColor={"#000000"}
                    level={"L"}
                    includeMargin={false}
                    renderAs={"svg"}
                />
                <h6 className='demo-card-name'>{userInfor.nameUser}</h6>
            </div>
            <div className='position-relative'>
                <img src={BannerInfoScan2} className="img-info-scan" alt="img"/>
                <div className='line'></div>
                <img src={userInfor.avatarUrl ? userInfor.avatarUrl : null} className='scanned-avatar' alt="img"/>
                <div className='header-name'>
                    <h4 className='scanned-name text-dark'>{userInfor.nameUser}</h4>
                    <p className='scanned-address'>Hai Phong, Viet Nam</p>
                </div>
                {
                    userInfor.social.map((social, idx) => (
                        <a href={social.socialLink} className={`scanned-card scanned-card-${idx}`} key={idx}>
                            <span>{social.socialName}</span>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </a>
                    ))
                }
            </div>
        </div>
    )
}
