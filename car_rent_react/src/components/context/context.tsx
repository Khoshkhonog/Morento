import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Car, User } from '../types';
import Cookies from 'js-cookie';
interface StateContextType {
    carDetailArray: Car;
    setCarDetailArray: React.Dispatch<React.SetStateAction<Car>>;
    wishlistArr: Car[]
    setWishlistArr: React.Dispatch<React.SetStateAction<Car[]>>
    handleAddToWishlist: (item: Car) => void;
    currentUser: User | null
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>,
    handleUpdateUser: (user: User | null) => void
    carDB: Car[]
    setCarDB: React.Dispatch<React.SetStateAction<Car[]>>
    getData: () => Promise<Car[]>
    getCarById: (id: number) => Car | undefined
    isInWishlist: (item: Car) => boolean
    backendUrl: string
}

const StateContext = createContext<StateContextType | null>(null);

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [carDetailArray, setCarDetailArray] = useState<Car>({
        carId: 1,
        carType: 'Sport',
        carName: "Koenigsegg",
        carImage: "/img/catalogue/cars-img/car.png",
        carPrice: "$99.00",
        liters: '90L',
        transmission: "Manual",
        seats: "2 People",
        carDescription: "lorem"
    });
    //your local backend'http://127.0.0.1:8000';
    const backendUrl = 'http://127.0.0.1:8000';

    const [currentUser, setCurrentUser] = useState<User | null>(null);


    const [wishlistArr, setWishlistArr] = useState<Car[]>([]);

    const [carDB, setCarDB] = useState<Car[]>([]);


    const handleUpdateUser = (user: User | null) => {
        setCurrentUser(user);
        Cookies.set('currentUser', JSON.stringify(user), { expires: 7 });
    }

    const handleAddToWishlist = (item: Car) => {
        let updatedWishlist;
        if (wishlistArr.some(i => i.carId === item.carId)) {
            updatedWishlist = wishlistArr.filter(i => i.carId !== item.carId);
        } else {
            updatedWishlist = [...wishlistArr, item];
        }

        setWishlistArr(updatedWishlist);
        Cookies.set('wishlist', JSON.stringify(updatedWishlist), { expires: 7 }); // Сохранение в куки
    }

    const isInWishlist = (item: Car) => wishlistArr.some(wishItem => wishItem.carId === item.carId);

    async function getData() {
        try {
            const response = await fetch(`${backendUrl}/api/vehicles`); // Замените URL на нужный
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json(); // Преобразование ответа в JSON
            setCarDB([...data])
            return data; // Возвращаем данные
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }
    const getDataCallback = useCallback(() => getData(), [])
    function getCarById(id: number) {
        return carDB.find(car => car.carId === id);
    }
    useEffect(() => {
        const wishlistCookie = Cookies.get('wishlist');
        if (wishlistCookie) {
            setWishlistArr(JSON.parse(wishlistCookie));
        }

        const currentUserCookie = Cookies.get('currentUser');
        if (currentUserCookie) {
            setCurrentUser(JSON.parse(currentUserCookie));
        }
        if (carDB?.length === 0) {
            getDataCallback()
        }
        const darkmodeCookie = Cookies.get('darkmode');
        if (darkmodeCookie?.toLowerCase() === 'true') {
            document.body.classList.add('dark-mode');
        }
        else {
            document.body.classList.remove('dark-mode');
        }

    }, [])




    return (
        <StateContext.Provider value={{
            carDetailArray, setCarDetailArray,
            wishlistArr, setWishlistArr, handleAddToWishlist, isInWishlist,
            currentUser, setCurrentUser, handleUpdateUser,
            carDB, setCarDB, getData,
            getCarById,
            backendUrl
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(StateContext);
    if (context === null) {
        throw new Error("useAppContext must be used within a StateProvider");
    }
    return context;
};