import { Link } from 'react-router-dom'
export default function Footer() {
    return <div className="footer">
        <div className="footer-upper-block">
            <div className="logo-part">
                <div className="logo">
                    <Link to="/" className="color-primary">MORENT</Link>
                </div>
                <div className='undertext'>Our vision is to provide convenience and help increase your sales business.</div>
            </div>
            <div className='footer-nav-links'>
                <div className="nav-link-block">
                    <div className='nav-link-title'>About</div>
                    <div className='nav-link-container'>
                        <div>How it works</div>
                        <div>Featured</div>
                        <div>Partnership</div>
                        <div>Bussiness Relation</div>
                    </div>
                </div>
                <div className="nav-link-block">
                    <div className='nav-link-title'>Community</div>
                    <div className='nav-link-container'>
                        <div>Events</div>
                        <div>Blog</div>
                        <div>Podcast</div>
                        <div>Invite a friend</div>
                    </div>
                </div>
                <div className="nav-link-block">
                    <div className='nav-link-title'>Socials</div>
                    <div className='nav-link-container'>
                        <div>Discord</div>
                        <div>Instagram</div>
                        <div>Twitter</div>
                        <div>Facebook</div>
                    </div>
                </div>
            </div>
        </div>
        <div className='footer-bottom-block'>
            <hr />
            <div className='copyright'>
                <div>©2022 MORENT. All rights reserved</div>
                <div className='privacy-terms'>
                    <div>Privacy & Policy</div>
                    <div>Terms & Condition</div>
                </div>
            </div>
        </div>
    </div>
}