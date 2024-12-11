import { Car } from "../types"
const PreviewCard = ({ car, file = null }: { car: Car | null, file?: File | null }) => {
    const url = file ? URL.createObjectURL(file) : car?.carImage
    return <div className="car-container">
        <div className="car-name">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 'bold' }} >{car?.carName}</div>
                <button
                    className="transparent"
                    title="add to wishlist">
                    <img src={"/img/catalogue/Like-hollow.svg"} alt="" />
                </button>
            </div>
            <div className="secondory-color">{car?.carType}</div>
        </div>
        <div className="car-img">
            <button title={car?.carName}><img src={url} alt="" /></button>
        </div>
        <div className="car-tags">
            <div className="cacar.r-tag">
                <img src="/img/catalogue/tags/gas-station.svg" alt="" />
                <div className="secondory-color">{car?.liters}L</div>
            </div>
            <div className="car-tag">
                <img src="/img/catalogue/tags/transmission.svg" alt="" />
                <div className="secondory-color">{car?.transmission}</div>
            </div>
            <div className="car-tag">
                <img src="/img/catalogue/tags/profile-2user.svg" alt="" />
                <div className="secondory-color">{car?.seats} people</div>
            </div>
        </div>
        <div className="price">
            <div>${`${car?.carPrice}/day`}</div>
            <button className="primary-button">Rent Now</button>
        </div>
    </div>
}

export default PreviewCard