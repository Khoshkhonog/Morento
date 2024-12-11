import http
from pathlib import Path
from fastapi import APIRouter, Depends
import fastapi
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session, declarative_base
from config import DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME
from models.models import Review
from auth.database import User
from auth.manager import current_user
from pydantic import BaseModel
from typing import Optional


DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
engine = create_engine(DATABASE_URL)
Base = declarative_base()
router = APIRouter()

def rating_check(rating:int):
    return True if rating >= 0 and rating <= 5 else False
async def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
class ReviewBase(BaseModel):
    car_id: int
    user_id: int
    username: str
    rating: int
    text: str
class UpdateReview(BaseModel):
    review_new_text: Optional[str]
    new_rating: Optional[int]

@router.get('/api/get_reviews/{car_id}')
def get_reviews(car_id: int, db: Session = Depends(get_db)):
    reviews = db.query(Review).filter(Review.car_id == car_id).order_by(Review.id).all()
    return reviews

    
@router.post('/api/create_review')
def create_review(review: ReviewBase, db: Session = Depends(get_db), user: User = Depends(current_user)):
    db_review = Review(car_id=review.car_id, user_id=review.user_id, username=review.username, rating=review.rating, text=review.text)
    db.add(db_review)
    db.commit()
    return {"message": "Review created successfully"}

@router.patch('/api/update_review/{review_id}')
def update_review(review_id: int, new_review: UpdateReview, db: Session = Depends(get_db), user: User = Depends(current_user)):
    try:
        db_review =  db.query(Review).filter(Review.id == review_id).first()
        if db_review is None:
            return {"error": "Review not found"}, http.HTTPStatus.NOT_FOUND
        
        if db_review.user_id != user.id and not user.is_superuser:
            return {"error": "You don't have permission to update this review"}, http.HTTPStatus.FORBIDDEN
        
        if new_review.review_new_text:
            db_review.text = new_review.review_new_text
        
        if new_review.new_rating is not None and rating_check(new_review.new_rating):
            db_review.rating = new_review.new_rating
        
        db.commit()
        return {"message": "Review updated successfully"}
    except Exception as e:
        db.rollback()
        return {"error": str(e)}, http.HTTPStatus.INTERNAL_SERVER_ERROR
    
@router.delete('/api/delete_review/{review_id}')
def delete_review(review_id: int, db: Session = Depends(get_db), user: User = Depends(current_user)):
    try:    
        db_review = db.query(Review).filter(Review.id == review_id).first()
        if db_review is None:
            return {"error": "Review not found"}, http.HTTPStatus.NOT_FOUND
        
        if db_review and db_review.user_id == user.id or user.is_superuser:
            db.delete(db_review)
            db.commit()
            return {"message": "Review deleted successfully"}
    except Exception as e:
        db.rollback()
        return {"error": str(e)}, http.HTTPStatus.INTERNAL_SERVER_ERROR

'''okay i transer it here and localy its working lets see if it works on deployment
upd: its working but css doesn't work on deployment idk man
upd 2: i fix it'''
FRONTEND_DIST = Path('../car_rent_react/build')
@router.get('/{path:path}')
async def catch_all(path: str):
    fp = Path(FRONTEND_DIST  / path)
    if not fp.exists() or not fp.is_file():
        fp = FRONTEND_DIST / "index.html"
    return fastapi.responses.FileResponse(fp) 
    

