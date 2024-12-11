from fastapi import APIRouter, Depends
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session, declarative_base
from config import DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME
from models.models import Car
from pydantic import BaseModel
from auth.database import User
from fastapi import FastAPI, File, UploadFile,Form
import shutil
from fastapi import HTTPException
from auth.manager import current_user
import os


DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

async def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
router = APIRouter()
current_dir = os.path.dirname(os.path.abspath(__file__))
img_path = os.path.join(current_dir, '..', '..', 'car_rent_react', 'public', 'img', 'catalogue', 'cars-img')
class CarModel(BaseModel):
    carType: str
    carName: str
    carImage: str
    carPrice: str
    liters: str
    transmission: str
    seats: str
    carDescription: str
    discount: None
    
    
@router.get('/api/vehicles')
def get_vehicles(db: Session = Depends(get_db)):
    vehicles_items = db.query(Car).order_by(Car.carId).all()
    results = [{'carId': item.carId, 'carName': item.carName,'carType': item.carType, 'carPrice': item.carPrice, 'carDescription': item.carDescription,'carImage':item.carImage,
                'liters':item.liters, 'transmission':item.transmission,'seats':item.seats, 'discount':item.discount} for item in vehicles_items]
    return results


@router.post('/api/add_vehicles')
async def upload_file(carType: str = Form(...), carName: str = Form(...),
                      carPrice: str = Form(...), liters: str = Form(...), transmission: str = Form(...),
                      seats: str = Form(...), carDescription: str = Form(...), file: UploadFile = File(...),db: Session = Depends(get_db), user: User = Depends(current_user)):
    if user.is_superuser:
        # Save the uploaded file to the desired folder
        file_path = os.path.join(img_path, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Create a new Car instance
        new_car = Car(
            carType=carType,
            carName=carName,
            carImage=f'/img/catalogue/cars-img/{file.filename}',
            carPrice=carPrice,
            liters=liters,
            transmission=transmission,
            seats=seats,
            carDescription=carDescription,
            discount=None
        )

        # Add the new Car instance to the database
        db.add(new_car)
        db.commit()

        return {"message": "File uploaded successfully"}
    else:
        raise HTTPException(status_code=403, detail="You don't have permission to perform this action")

@router.put('/api/update_vehicle/{car_id}')
async def update_vehicle(car_id: int, car: CarModel, db: Session = Depends(get_db),user: User = Depends(current_user)):
        existing_car = db.query(Car).filter(Car.carId == car_id).first()
        if existing_car:
            existing_car.carType = car.carType
            existing_car.carName = car.carName
            existing_car.carImage = car.carImage
            existing_car.carPrice = car.carPrice
            existing_car.liters = car.liters
            existing_car.transmission = car.transmission
            existing_car.seats = car.seats
            existing_car.carDescription = car.carDescription
            existing_car.discount = None
            db.commit()
            return {"message": "Vehicle updated successfully"}
        else:
            raise HTTPException(status_code=404, detail="Vehicle not found")
@router.delete('/api/delete_vehicle/{car_id}')
async def delete_vehicle(car_id: int, db: Session = Depends(get_db),user: User = Depends(current_user)):
        existing_car = db.query(Car).filter(Car.carId == car_id).first()
        if user.is_superuser == False:
            raise HTTPException(status_code=403, detail="You don't have permission to perform this action")
        if existing_car:
            db.delete(existing_car)
            db.commit()
            return {"message": "Vehicle deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Vehicle not found")
@router.patch('/api/vehicle_discount/{car_id}')
async def update_vehicle_discount(car_id: int, discount: int, db: Session = Depends(get_db),user: User = Depends(current_user)):
        existing_car = db.query(Car).filter(Car.carId == car_id).first()
        if user.is_superuser == False:
            raise HTTPException(status_code=403, detail="You don't have permission to perform this action")
        if existing_car:
            existing_car.discount = discount
            db.commit()
            return {"message": "Vehicle discount updated successfully"}
        else:
            raise HTTPException(status_code=404, detail="Vehicle not found")

