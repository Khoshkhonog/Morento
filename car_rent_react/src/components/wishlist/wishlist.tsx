import { useAppContext } from '../context/context';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Car } from '../types';


const WishList: React.FC = () => {
    const { wishlistArr, setWishlistArr } = useAppContext()
    const navigate = useNavigate()
    const handleNavigate = (id: number) => {
        navigate(`/car/${id}`)
    }
    const hanldeDelFromWishlist = (item: Car) => {

        const updatedWishlist = wishlistArr?.filter(car => car.carId !== item.carId) || [];

        setWishlistArr(updatedWishlist);

        Cookies.set('wishlist', JSON.stringify(updatedWishlist), { expires: 7 });
    }
    return <div className="wishlist">
        <h1>Wishlist</h1>
        <h2 style={wishlistArr.length < 1 ? { display: 'block' } : { display: 'none' }} >Nothing here now</h2>
        <div className="wishlist-container">{wishlistArr?.map(item =>
            <div className='wishlist-item'>
                <button className='transparent' onClick={() => handleNavigate(item.carId)} title='car'><img src={item.carImage} alt="" /></button>
                <div>{item.carName}</div>
                <button className='transparent' title='delete' onClick={() => hanldeDelFromWishlist(item)}><img src="/img/catalogue/delete_icon.svg" alt="" /></button>
            </div>
        )}</div>
    </div>
}

export default WishList