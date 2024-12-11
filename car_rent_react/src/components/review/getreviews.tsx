import { useEffect, useState } from 'react'
import { Review } from '../types'
import AddReview from './addreview'
import { useAppContext } from '../context/context'
import axios from 'axios'
function Reviews({ carId }: { carId: number }) {
    const [reviews, setReviews] = useState<Review[] | null>(null)
    const [showChangeMenu, setShowChangeMenu] = useState<Record<number, boolean>>({})
    const { currentUser } = useAppContext()

    const getReviewsStars = (rating: number) => {
        return new Array(rating).fill('/img/car-detail/star-fiiled.svg')
    }
    const toggleChangeReview = (reviewId: number) => setShowChangeMenu(
        (prevShowChangeMenu) => ({
            ...prevShowChangeMenu,
            [reviewId]: !prevShowChangeMenu[reviewId],
        })
    );
    const { backendUrl } = useAppContext()
    const get_reviews = async () => {
        axios.get(`${backendUrl}/api/get_reviews/${carId}`).then((response) => {
            setReviews(response.data)
        })
    }
    useEffect(() => {
        get_reviews()
    }, [carId])
    return <div className="Reviews">
        <div>
            <div className='reviews-header'>
                <div>Reviews</div>
                <div className='primary-button'>{reviews?.length}</div>
            </div>
            <div>{reviews !== null ? reviews.map((item) => <div>
                <div key={item.id} className="review-container">
                    <div className="user-picture">
                        <img src="/img/header/icon_defalt.jpg" alt="" />
                    </div>
                    <div className="reviewer">
                        <div className="reviewer-container">
                            <div className="review-edit">
                                <div className='reviewer-name'>
                                    <h4>{item.username}</h4>
                                    <div className='review-stars'>{getReviewsStars(item.rating).map((star) => <img src={star} alt="" />)}</div>
                                </div>
                                {currentUser?.user_id === item.user_id ? <div>
                                    <button className='transparent change-icon'
                                        title='change'
                                        onClick={() => toggleChangeReview(item.id)}>
                                        <img src={document.body.classList.contains('dark-mode') ?
                                            '/img/car-detail/edit-darkmode.svg' : '/img/car-detail/edit.svg'
                                        } alt="change" />
                                    </button>
                                    <div style={{ display: showChangeMenu[item.id] ? 'block' : 'none' }}>
                                    </div>
                                </div> : ''}
                            </div>
                            {showChangeMenu[item.id] ? <AddReview carId={carId} changingExisting={true} review_id={item.id} text_review={item.text} rating_review={item.rating} />
                                : <div className="review-text">{item.text}</div>}
                        </div>
                    </div>
                </div>
            </div>) : <div>No reviews yet</div>}</div>
        </div>
    </div>

}
export default Reviews