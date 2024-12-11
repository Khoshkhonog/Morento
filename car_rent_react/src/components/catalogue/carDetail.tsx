import React, { useState, useEffect } from "react";
import ProductGrid from "./productGrid";
import { useAppContext } from "../context/context";
import { Car } from "../types";
import { useParams, useNavigate } from "react-router-dom";
import ModelViewer from "../model-viewer/ModelViewer";
import AddReview from "../review/addreview";
import Reviews from "../review/getreviews";
const CarDetail: React.FC = () => {
    const navigate = useNavigate()
    const params = useParams()
    const { getCarById, handleAddToWishlist, isInWishlist } = useAppContext()
    const itemID: number = (params.item ? JSON.parse(params.item) : []);
    const [item, setItem] = useState<Car>()
    const [showAddReview, setShowAddReview] = useState(false)
    useEffect(() => {
        setItem(getCarById(itemID))
    })
    return (
        <div className="car-detail">
            <div className="car-detail-hero">
                <div className="hero">
                    <div className="big-img">
                        <div className="hero-text">
                            <h2>Sports car with the best design and acceleration</h2>
                            <div>Safety and comfort while driving a
                                futuristic and elegant sports car</div>
                        </div>
                        <img src={item?.carImage} alt={item?.carName} />
                    </div>
                    <div className="smaller-img">
                        <img src="/img/car-detail/View2.png" alt="" />
                        <img src="/img/car-detail/View3.png" alt="" />
                        <ModelViewer carName={item?.carName ? item?.carName : ''} />
                    </div>
                </div>
                <div className="car-info">
                    <div className="text">
                        <div className="car-name">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h1 style={{ fontWeight: 'bold' }} >{item?.carName}</h1>
                                <button className="transparent" onClick={() => item && handleAddToWishlist(item)}>
                                    {item && isInWishlist(item) ? <img src="/img/catalogue/Like-red-fill.svg" alt="heart" /> : <img src="/img/catalogue/Like-hollow.svg" alt="heart" />}
                                </button>
                            </div>
                        </div>
                        <div className="car-desc secondory-color">
                            NISMO has become the embodiment of Nissan's outstanding performance, inspired by the most unforgiving proving ground, the "race track".
                        </div>
                        <div className="car-tags-grid">
                            <div className="car-tag-container">
                                <div className="secondory-color">Type Car</div>
                                <div className="text-capitalize">{item?.carType}</div>
                            </div>
                            <div className="car-tag-container">
                                <div className="secondory-color">Steering </div>
                                <div className="text-capitalize">{item?.transmission}</div>
                            </div>
                            <div className="car-tag-container">
                                <div className="secondory-color">Capacity</div>
                                <div className="text-capitalize">{item?.seats}</div>
                            </div>
                            <div className="car-tag-container">
                                <div className="secondory-color">Gasoline</div>
                                <div className="text-capitalize">{item?.liters}</div>
                            </div>
                        </div>
                        <div className="car-price">
                            <div className="car-price-container">
                                <h1>${item?.carPrice}/</h1>
                                <div className="secondory-color">day</div>
                            </div>
                            <button className="primary-button" onClick={() => navigate(`/payment/${itemID}`)}>Rent Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="reviews">
                <Reviews carId={itemID} />
                <button className="primary-button" onClick={() => setShowAddReview(!showAddReview)}>Leave a Review</button>
                <div style={{ display: showAddReview ? 'block' : 'none' }} className="add-review-companent">
                    <AddReview carId={itemID} />
                </div>
            </div>
            <div className="product-grid-container">
                <ProductGrid showMoreBtn={false} grindN={3} showN={6} />
            </div>
        </div>
    )
}
export default CarDetail