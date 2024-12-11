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
  /*
  for barely use localy use this and commnet one line on getData()
  const [carDB, setCarDB] = useState<Car[]>([
    {
      id: 2,
      model: "Nissan GT - R",
      description: "lorem",
      price: 80.00,
      image: "/img/catalogue/cars-img/car2.png",
      fuel: "80L",
      transmission: "Manual",
      capacity: "2 People",
      mileage: 20,
      type: "Sport"
    },
    {
      id: 3,
      model: "Rolls - Royce",
      description: "lorem",
      price: 96.00,
      image: "/img/catalogue/cars-img/car3.png",
      fuel: "90L",
      transmission: "Manual",
      capacity: "2 People",
      mileage: null,
      type: "Sedan"
    },
    {
      id: 4,
      model: "Nissan GT - R",
      description: "lorem",
      price: 80.00,
      image: "/img/catalogue/cars-img/car4.png",
      fuel: "80L",
      transmission: "Manual",
      capacity: "2 People",
      mileage: null,
      type: "Sport"
    },
    {
      id: 5,
      model: "All New Rush",
      description: "lorem",
      price: 72.00,
      image: "/img/catalogue/cars-img/car5.png",
      fuel: "70L",
      transmission: "Manual",
      capacity: "6 People",
      mileage: 72,
      type: "SUV"
    },
    {
      id: 6,
      model: "CR - V",
      description: "lorem",
      price: 72.00,
      image: "/img/catalogue/cars-img/car6.png",
      fuel: "80L",
      transmission: "Manual",
      capacity: "6 People",
      mileage: null,
      type: "SUV"
    },
    {
      id: 7,
      model: "All New Terios",
      description: "lorem",
      price: 72.00,
      image: "/img/catalogue/cars-img/car7.png",
      fuel: "90L",
      transmission: "Manual",
      capacity: "6 People",
      mileage: null,
      type: "SUV"
    },
    {
      id: 8,
      model: "CR - V",
      description: "lorem",
      price: 80.00,
      image: "/img/catalogue/cars-img/car8.png",
      fuel: "80L",
      transmission: "Manual",
      capacity: "6 People",
      mileage: null,
      type: "SUV"
    },
    {
      id: 9,
      model: "MG ZX Exclusice",
      description: "lorem",
      price: 76.00,
      image: "/img/catalogue/cars-img/car9.png",
      fuel: "70L",
      transmission: "Manual",
      capacity: "4 People",
      mileage: null,
      type: "Hatchback"
    },
    {
      id: 10,
      model: "New MG ZS",
      description: "lorem",
      price: 80.00,
      image: "/img/catalogue/cars-img/car10.png",
      fuel: "80L",
      transmission: "Manual",
      capacity: "6 People",
      mileage: null,
      type: "SUV"
    },
    {
      id: 11,
      model: "MG ZX Exclusice",
      description: "lorem",
      price: 76.00,
      image: "/img/catalogue/cars-img/car9.png",
      fuel: "70L",
      transmission: "Manual",
      capacity: "4 People",
      mileage: null,
      type: "Hatchback"
    },
    {
      id: 12,
      model: "New MG ZS",
      description: "lorem",
      price: 80.00,
      image: "/img/catalogue/cars-img/car10.png",
      fuel: "80L",
      transmission: "Manual",
      capacity: "6 People",
      mileage: null,
      type: "SUV"
    },
    {
      id: 1,
      model: "Koenigsegg",
      description: "lorem",
      price: 99.00,
      image: "/img/catalogue/cars-img/car.png",
      fuel: "40L",
      transmission: "manual",
      capacity: "2 people",
      mileage: 20,
      type: "Sport"
    }
  ];)
  */


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
      const data = await response.json();
      //commnet this line to use localy
      setCarDB([...data])
      return data;
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