import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from '../context/context';
import { Car } from '../types'
// Определяем интерфейс для пропсов
interface ProductGridProps {
    grindN?: number; // 
    showN?: number
    filters?: { [key: string]: boolean | number }
    showMoreBtn?: boolean
}


/* 
 *@param {number} grindN - The number of columns in the grid. update: this not used need to clean up
 * @param {number} showN - The number of cars to show.
 * @param {object} filters - An object containing the filters for the cars. The keys are the car types, and the values are booleans indicating whether the type is selected.
 * @param {boolean} showMoreBtn - A boolean indicating whether to show the show more button. If 'placeholder' is true in the filters object, it will show all cars.
*/
const ProductGrid: React.FC<ProductGridProps> = ({ grindN = 4, showN = 9, filters = { 'placeholder': true }, showMoreBtn = true }) => {
    //data base from context
    const { carDB, setCarDB, getData } = useAppContext()
    //wishlist
    const { wishlistArr, handleAddToWishlist } = useAppContext()

    const [carsArray, SetCarsArray] = useState<Car[]>(carDB);



    const [showMoreButton, setShowMoreButton] = useState(showMoreBtn);

    const navigate = useNavigate()

    //getting data from backend
    useEffect(() => {
        getData().then(data => SetCarsArray(data));

    }, [])

    //filtring logic
    const filterCars = (cars: Car[], filters: { [key: string]: boolean | number }): Car[] => {
        return cars.filter(car => {
            //type is suv,sedan...
            const typeMatches = filters[car.carType] === true; // type check
            //match seats
            const seatsMatch = filters[car.seats] === true; //seats check
            const priceMatch =
                typeof filters['filterPrice'] === 'number'
                    ? parseFloat(car.carPrice.replace('$', '').replace(',', '')) <= filters['filterPrice']
                    : true;
            if (typeMatches && seatsMatch) {
                console.log(typeMatches, seatsMatch)
                return typeMatches && seatsMatch && priceMatch
            }
            else {
                return (typeMatches || seatsMatch) && priceMatch
            }
        });
    };
    //checking active filters
    const true_check = (item: boolean | number) => typeof item === 'boolean' ? item === true : false
    // filtering
    const filteredCars = Object.values(filters).some(true_check) && !filters['placeholder']
        ? filterCars(carsArray, filters)
        : carsArray;

    const [showMore, setShowMore] = useState(showN)

    const handleShowMore = () => {
        if (showMore + showN >= carsArray.length) {
            setShowMoreButton(false)
        }
        setShowMore(showMore + showN)
    }
    //navigating to car detail page
    const handleNavigate = (item: Car, to: string) => {
        window.scrollTo(0, 0)
        navigate(`/${to}/${item.carId}`)
    }

    const isInWishlist = (item: Car) => wishlistArr.some(wishItem => wishItem.carId === item.carId);
    return <><div className="cars-grid">
        {filteredCars?.slice(0, showMore).map((item, indx) =>
            <div className="car-container" key={indx}>
                <div className="car-name">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ fontWeight: 'bold' }} >{item.carName}</div>
                        <button
                            className="transparent"
                            title="add to wishlist"
                            onClick={() => handleAddToWishlist(item)}>
                            <img src={isInWishlist(item) ? "/img/catalogue/Like-red-fill.svg" : "/img/catalogue/Like-hollow.svg"} alt="" />

                        </button>
                    </div>
                    <div className="secondory-color ">{item.carType}</div>
                </div>
                <div className="car-img">
                    <button title={item.carName} onClick={() => handleNavigate(item, 'car')} ><img src={item.carImage} alt="" /></button>
                </div>
                <div className="car-tags">
                    <div className="car-tag">
                        <img src="/img/catalogue/tags/gas-station.svg" alt="" />
                        <div className="secondory-color text-capitalize">{item.liters}</div>
                    </div>
                    <div className="car-tag">
                        <img src="/img/catalogue/tags/transmission.svg" alt="" />
                        <div className="secondory-color text-capitalize">{item.transmission}</div>
                    </div>
                    <div className="car-tag">
                        <img src="/img/catalogue/tags/profile-2user.svg" alt="" />
                        <div className="secondory-color text-capitalize">{item.seats}</div>
                    </div>
                </div>
                <div className="price">
                    <div>${`${item.carPrice}/day`}</div>
                    <button onClick={() => handleNavigate(item, 'payment')} className="primary-button">Rent Now</button>
                </div>
            </div>)}
    </div>
        <div style={showMoreButton === true ? { display: 'flex' } : { display: 'none' }} className="button-container">
            <div className="primary-button" onClick={() => handleShowMore()}>Show more car</div>
        </div>
    </>
}

export default ProductGrid