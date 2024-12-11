/* eslint-disable no-undef */
import axios from "axios";
import { useState } from "react";
import { useAppContext } from "../context/context";

/**
 * AddReview - component for adding or changing a review to a car 
 *
 * @param {number} carId - id of the car
 * @param {boolean} changingExisting Optional- whether the review is being changed or not
 * @param {number} review_id Optional- id of the review being changed
 * @param {string} text_review Optional- the text of the review being changed
 * @param {number} rating_review Optional- the rating of the review being changed
 *
 */
function AddReview({ carId, changingExisting = false, review_id = 0, text_review = '', rating_review = 0 }:
    {
        carId: number, changingExisting?: boolean, review_id?: number,
        text_review?: string, rating_review?: number
    }) {
    const [reviewText, setReviewText] = useState(text_review)
    const [rating, setRating] = useState(rating_review)
    const [hoverRating, setHoverRating] = useState(0);


    const { currentUser } = useAppContext()

    const { backendUrl } = useAppContext()

    async function handleChangeReview(review_id: number) {
        const changedReview = {
            review_new_text: reviewText,
            new_rating: rating
        }
        try {
            await axios.patch(`${backendUrl}/api/update_review/${review_id}`, changedReview, { withCredentials: true })
            window.location.reload()

        } catch (error) {
            console.log(error)
        }

    }
    async function handleAddReview() {

        const review = {
            user_id: currentUser?.user_id,
            username: currentUser?.username,
            rating: rating,
            text: reviewText,
            car_id: carId,
        }
        setReviewText('')
        setRating(0)
        setHoverRating(0)

        try {
            await axios.post(`${backendUrl}/api/create_review`, review, { withCredentials: true });

        } catch (error) {
            console.log(error);
        }

    }

    const handleMouseOver = (index: number) => {
        setHoverRating(index);
    };

    const handleMouseOut = () => {
        setHoverRating(0);
    };

    const handleRating = (index: number) => {
        setRating(index);
    };
    const handleReviewText = (e: any) => {
        setReviewText(e.target.value)
    }
    return <div className="expetion">
        {currentUser !== null ? <div className="add-review">
            <textarea name="" id="" cols={120} rows={5} placeholder="Leave a review" value={reviewText} onChange={handleReviewText}></textarea>
            <div className="stars">
                {[1, 2, 3, 4, 5].map((index) => (
                    <img
                        key={index}
                        src={hoverRating >= index || rating >= index ? '/img/car-detail/star-fiiled.svg' : '/img/car-detail/star-hollow.svg'}
                        onMouseOver={() => handleMouseOver(index)}
                        onMouseOut={handleMouseOut}
                        onClick={() => handleRating(index)}
                        alt="Rating star"
                    />
                ))}
            </div>
            <button onClick={changingExisting ? () => handleChangeReview(review_id) : () => handleAddReview()}>{changingExisting ? 'Change Review ' : 'add Review'}</button>
        </div> : <div>You need Authorization first</div>
        }
    </div >
}
export default AddReview;