import { useForm } from 'react-hook-form';
import { Car } from '../types';
interface CarFormProps {
    car: Car | null;
    onSubmit: (car: Car) => void;
}

const CarForm: React.FC<CarFormProps> = ({ car, onSubmit }) => {
    const { register, handleSubmit } = useForm({
        defaultValues: car ?? {},
    });

    const handleFormSubmit = (data: Car) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <input type="text" {...register('carName')} placeholder="Car Name" />
            <input type="text" {...register('carType')} placeholder="Car Type" />
            <input type="text" {...register('liters')} placeholder="Liters" />
            <select {...register('transmission')}>
                <option value="manual">Manual</option>
                <option value="automatic">Automatic</option>
            </select>
            <input type="text" {...register('seats')} placeholder="Seats" />
            <input type="text" {...register('carPrice')} placeholder="Car Price" />
            <input type="text" {...register('carDescription')} placeholder="Car Description" />
            <button type="submit">Отправить</button>
        </form>
    );
};

export default CarForm;