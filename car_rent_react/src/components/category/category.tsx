import React, { useState } from 'react';
import ProductGrid from '../catalogue/productGrid';
const CategoryPage: React.FC = () => {
    const inputTypes: string[] = ['Sport', 'SUV', 'MPV', 'Coupe', 'Hatchback']

    const capasityTypes: string[] = ['2 People', '4 People', '6 People', '8 or More']

    const [price, setPrice] = useState<number>(100);
    // Обработчик изменения значения чекбоксов  
    const [filters, setFilters] = useState({
        'Sport': false,
        Sedan: false,
        SUV: false,
        Hatchback: false,
        '2 People': false,
        '4 People': false,
        '6 People': false,
        '8 or More': false,
        'filterPrice': price,
    });
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, [event.target.name]: event.target.checked })
    }

    // Обработчик изменения значения ползунка
    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPrice = Number(event.target.value);
        setPrice(newPrice); // обновляем состояние цены
        setFilters({ ...filters, filterPrice: newPrice }); // обновляем фильтры
    };
    return <div className="category">
        <div className="type-inputs">
            <div className="types-container">
                <div>T Y P E</div>
                {inputTypes.map((item, indx) =>
                    <div className='input-type-container' key={indx}>
                        <input type="checkbox" id={item} name={item} onChange={handleCheckboxChange} />
                        <label htmlFor={item}>{item}</label>
                    </div>)}
            </div>
            <div className="types-container">
                <div>C A P A C I T Y</div>
                {capasityTypes.map((item, indx) =>
                    <div className='input-type-container' key={indx}>
                        <input type="checkbox" id={item} name={item} onChange={handleCheckboxChange} />
                        <label htmlFor={item}>{item}</label>
                    </div>)}
            </div>
            <div className="types-container price-container">
                <div>P R I C E</div>
                <input
                    type="range"
                    name="filterPrice"
                    id="price"
                    min={40}
                    max={140}
                    onChange={handlePriceChange}
                    step={10}
                />
                <label htmlFor="price">Max: ${price}</label>
            </div>
        </div>
        <div>
            <ProductGrid grindN={3} showN={6} filters={filters} />
        </div>
    </div>
}
export default CategoryPage;