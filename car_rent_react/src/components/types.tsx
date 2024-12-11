export type Car = {
    carId: number;
    carType: string;
    carName: string;
    carImage: string;
    carPrice: string;
    liters: string;
    transmission: string;
    seats: string;
    carDescription: string;
    discount?: number; // optinonal
}

export interface User {
    user_id: number;
    email: string;
    registret_at: string;
    username: string;
    role_id: number
}
export type Review = {
    id: number
    user_id: number,
    username: string,
    rating: number,
    text: string,
    car_id: number,
}