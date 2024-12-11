import { useAppContext } from "../context/context"
import { useEffect, useState } from "react"
import { Car } from "../types"
import PreviewCard from "./previewCard"
import { useForm } from "react-hook-form"
import axios from "axios"
import PopOut from "../pop-out/pop-out"
import { Form } from "react-router-dom"
export default function ChangeCarMenu() {
    const [singleCar, setSingleCar] = useState<Car | null>(null)
    const [showSingleCar, setShowSingleCar] = useState(false)
    const [showPopOut, setShowPopOut] = useState({
        text: '',
        show: false,
        sucsess: false
    })
    const handleEditCar = (car: Car | null) => {
        setShowSingleCar(!showSingleCar)
        setSingleCar(car ?? null);
    }
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            carName: singleCar?.carName,
            carType: singleCar?.carType,
            carPrice: singleCar?.carPrice,
            liters: singleCar?.liters,
            transmission: 'manual',
            seats: singleCar?.seats,
            carDescription: singleCar?.carDescription,
        },
    });
    const updatedCar = watch(['carType', 'carName', 'carPrice', 'liters', 'transmission', 'seats', 'carDescription']);
    useEffect(() => {
        if (singleCar) {
            setSingleCar({
                ...singleCar,
                carType: updatedCar[0] !== '' && updatedCar[0] ? updatedCar[0] : singleCar.carType,
                carName: updatedCar[1] !== '' && updatedCar[1] ? updatedCar[1] : singleCar.carName,
                carPrice: updatedCar[2] !== '' && updatedCar[2] ? updatedCar[2] : singleCar.carPrice,
                liters: updatedCar[3] !== '' && updatedCar[3] ? updatedCar[3] : singleCar.liters,
                transmission: updatedCar[4] !== '' && updatedCar[4] ? updatedCar[4] : singleCar.transmission,
                seats: updatedCar[5] !== '' && updatedCar[5] ? updatedCar[5] : singleCar.seats,
                carDescription: updatedCar[6] !== '' && updatedCar[6] ? updatedCar[6] : singleCar.carDescription,
            });
            console.log(singleCar)
        }
    }, [updatedCar[0], updatedCar[1], updatedCar[2], updatedCar[3], updatedCar[4], updatedCar[5], updatedCar[6]]);
    const { carDB } = useAppContext()

    const { backendUrl } = useAppContext()

    const handleCarUpdate = async (data: any) => {
        try {
            const updateData = {
                'carType': singleCar?.carType,
                'carName': singleCar?.carName,
                'carPrice': singleCar?.carPrice,
                'carImage': singleCar?.carImage ?? '',
                'liters': `${singleCar?.liters}L`,
                'transmission': singleCar?.transmission,
                'seats': `${singleCar?.seats} people`,
                'carDescription': singleCar?.carDescription,
                discount: null,
            }
            await axios.put(`${backendUrl}/api/update_vehicle/${singleCar?.carId}`, updateData, { withCredentials: true });
            setShowPopOut({ text: 'Car updated successfully', show: true, sucsess: true });
        } catch (error) {
            console.error(error);
            setShowPopOut({ text: 'Error updating car', show: true, sucsess: false })
        }
    };

    return <div className="change-car">
        <div style={showSingleCar == true ? { display: 'none' } : { display: 'block' }}>
            {carDB.map((car) => (
                <div key={car.carId} className="change-car-container">
                    <div className="change-car-card" key={car.carId}>
                        <div className="car-container">
                            <div className="change-car-img">
                                <img src={car.carImage} alt="" />
                            </div>
                            <div className="change-car-details">
                                <div className="change-car-name">{car.carName}</div>
                                <div className="change-car-type">{car.carType}</div>
                                <div className="change-car-price">{car.carPrice}</div>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => handleEditCar(car)}>Change</button>
                </div>
            ))}
        </div>
        <div className="change-single-car" style={showSingleCar == true ? { display: 'block' } : { display: 'none' }}>
            <div className="change-single-car-container">
                <PreviewCard car={singleCar} />

                <button onClick={() => handleEditCar(null)}>exit changing</button>
            </div>
            <div className="add-car-inputs">
                <form className='add-car-form' onSubmit={handleSubmit(handleCarUpdate)}>
                    <input type="text" defaultValue={singleCar?.carName} {...register('carName')} placeholder="Car Name" />
                    <input type="text" defaultValue={singleCar?.carType} {...register('carType')} placeholder="Car Type" />
                    <input type="text" defaultValue={singleCar?.liters} {...register('liters')} placeholder="Liters" />
                    <input type="text" defaultValue={singleCar?.seats} {...register('seats')} placeholder="Seats" />
                    <input type="text" defaultValue={singleCar?.carPrice} {...register('carPrice')} placeholder="Car Price" />
                    <input type="text" defaultValue={singleCar?.carDescription} {...register('carDescription')} placeholder="Car Description" />
                    <button type="submit">Отправить</button>
                </form>
            </div>
            <div>{showPopOut.show && <PopOut text={showPopOut.text} delay={0} duration={5500} success={showPopOut.sucsess} />}</div>
        </div>
    </div>
}
