import "./Footer.css"
import fb from "../../assets/fb.png"

export default function Footer() {
    return (
        <div className='footer py-5 bg-black'>
            <div className='container'>
                <div className="row bg-black row-footer">
                    <div className='col-xl-4 col-lg-4 col-md-4'>
                        <h2 className='banner__heading text-white fw-bold mb-0'>InfoCard</h2>
                        <h6 className='text-white fw-bold'>Theo dõi chúng tôi tại</h6>
                        <a href='/'>
                            <img src={fb} className="fb-img" alt='img'/>
                        </a>
                        <p className='section-desc fw-bold text-white mt-3'>dat9d3@gmail.com<br />©2021 InfoCard</p>
                        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d251637.95196238213!2d105.6189045!3d9.779349!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1641228216633!5m2!1svi!2s" width="600" height="450" style="border:0;" allowFullScreen loading="lazy"></iframe> */}
                    </div>
                    <div className='col-xl-4 col-lg-4 col-md-4'>
                        <h5 className='text-white fw-bold'>Thông tin liên hệ</h5>
                        <p className='section-desc fw-bold text-white mt-3'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <p className='section-desc fw-bold text-white mt-3'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                    <div className='col-xl-4 col-lg-4 col-md-4'>
                        <h5 className='text-white fw-bold'>Infor card</h5>
                        <p className='section-desc fw-bold text-white mt-3'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <p className='section-desc fw-bold text-white mt-3'>Lorem Ipsum is simply dummy text of the typesetting industry.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
