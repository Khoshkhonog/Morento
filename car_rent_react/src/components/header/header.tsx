import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAppContext } from '../context/context';
import Cookies from 'js-cookie';

export default function Header() {
  const { currentUser } = useAppContext();
  const profileSignIn = currentUser !== null ? '/user-profile' : '/sign-in';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkmode, setDarkmode] = useState(false);
  const toggleDarkMode = () => {
    if (document.body.classList.contains('dark-mode')) {
      document.body.classList.remove('dark-mode');
      Cookies.set('darkmode', 'false', { expires: 7 });
      setDarkmode(false)

    } else {
      document.body.classList.add('dark-mode');
      Cookies.set('darkmode', 'true', { expires: 7 });
      setDarkmode(true)
    }
  }

  return (
    <>
      <div className="header">
        <div className="left-side-header">
          <div className="logo">
            <Link to="/" className="color-primary">MORENT</Link>
          </div>
          <div className="search">
            <img src="/img/header/search-normal.svg" alt="" />
            <input type="text" placeholder="Search something here" />
            <img src="/img/header/filter.svg" alt="" />
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/category" className="nav-link">Category</Link>
          </div>
        </div>
        <div className="profile-section">
          <Link to={'/wishlist'}>
            <img src="/img/header/Like.svg" alt="" />
          </Link >
          <button className='transparent dark-mode-switch' title='dark mode'
            onClick={toggleDarkMode}>
            <img src='/img/header/dark-mode/sun.svg' alt="" />
          </button>
          <Link to={'/'}>
            <img src="/img/header/Notification.svg" alt="" />
          </Link>
          <Link to={'/'}>
            <img src="/img/header/Settings.svg" alt="" />
          </Link>
          <div className="profile-picture">
            <Link to={profileSignIn} className='user-info'>
              <div>
                <p>{currentUser?.email}</p>
              </div>
              <img src="/img/header/icon_defalt.jpg" alt="" />
            </Link>
          </div>
        </div>
      </div>
      <div className='mobile-header'>
        <div className="mobile-header_logo-btn">
          <div className="logo">
            <Link to="/" className="color-primary">MORENT</Link>
          </div>
          <button className='transparent menu-btn' title='Menu' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <img src={Cookies.get('darkmode') === 'true' ? '/img/header/dark-mode/menu-darkmode.svg' : '/img/header/menu-icon.svg'} alt="" />
          </button>
        </div>
        <div style={{ display: mobileMenuOpen ? 'flex' : 'none' }} className='mobile-drop-out-menu'>
          <Link to="/">Home</Link>
          <Link to="/category">Category</Link>
          <Link to={profileSignIn}>Profile</Link>
          <Link to={'/wishlist'}>Wishlist</Link >
          <button className='transparent' title='dark mode'
            onClick={toggleDarkMode}>
            <div>Dark mode</div>
          </button>
        </div>
      </div>
    </>
  );
}
