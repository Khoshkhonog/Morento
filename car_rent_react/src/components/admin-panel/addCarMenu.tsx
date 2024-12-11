import React, { useState, useEffect, useMemo, useRef } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Car } from '../types';
import PopOut from "../pop-out/pop-out"
import { useAppContext } from '../context/context';

import PreviewCard from './previewCard';
export default function AddCarMenu() {
    const [file, setFile] = useState<File | null>(null);

    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            carType: 'Car Type',
            carName: 'Car Name',
            carPrice: '123',
            liters: '69',
            transmission: 'manual',
            seats: '4',
            carDescription: '',
        },
    });

    const { backendUrl } = useAppContext()

    const [showPopOut, setShowPopOut] = useState({
        show: false,
        sucsess: false
    })
    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files?.[0] ?? null);
    };
    const Cardata = watch([
        'carType',
        'carName',
        'carPrice',
        'liters',
        'transmission',
        'seats',
        'carDescription',
    ]);
    const carDataObject = useMemo(() => {
        return {
            carType: Cardata[0],
            carName: Cardata[1],
            carPrice: Cardata[2],
            liters: Cardata[3],
            transmission: Cardata[4],
            seats: Cardata[5],
            carDescription: Cardata[6],
        };
    }, [Cardata]);
    const car = useMemo(() => carDataObject as Car, [carDataObject]);

    const handleFileUpload = async (data: any) => {
        if (file) {
            try {
                console.log(data)
                const formData = new FormData();
                formData.append('file', file);
                formData.append('carType', data.carType);
                formData.append('carName', data.carName);
                formData.append('carPrice', data.carPrice);
                formData.append('liters', `${data.liters}L`);
                formData.append('transmission', data.transmission);
                formData.append('seats', `${data.seats} people`);
                formData.append('carDescription', data.carDescription);
                await axios.post(`${backendUrl}/api/add_vehicles`, formData, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } });
                console.log('File uploaded successfully');
            } catch (error: Error | any) {
                console.error(error.response.data);
            }
        }
    };
    return <><div className="add-car">
        <div className="add-car-inputs">
            <form className='add-car-form' onSubmit={handleSubmit(handleFileUpload)}>
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
            <input type="file" name="" id="" title='attach a file' onChange={handleFileInput} />
        </div>
        <PreviewCard car={car} file={file} />
    </div>
        <div>{showPopOut.show && <PopOut text="Car updated" delay={0} duration={5500} success={showPopOut.sucsess} />}</div>
    </>
}
