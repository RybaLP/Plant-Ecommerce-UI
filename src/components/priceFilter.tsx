import React, { useState, type SetStateAction } from 'react'
import type { FilterType } from '../types/filterType';

interface Props {
    onChange : React.Dispatch<SetStateAction<FilterType>>;
    defaultOrder? : FilterType;
}

const PriceFilter = ({onChange, defaultOrder = "default"} : Props) => {

    const [selected, setSelected] = useState<FilterType>(defaultOrder);
    
    const handleChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        const order = e.target.value as FilterType;
        setSelected(order);
        onChange(order);
    }

  return (
    <select value={selected}
    onChange={handleChange}
    className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
    >
        <option value="default">Domyślne sortowanie</option>
        <option value="asc">Cena od najtańszej</option>
        <option value="desc">Cena od najdroższej</option>
        <option value="lowAmount">Ilość od najmniej</option>
        <option value="highAmount">Ilość od najwięcej</option>
    </select>
  )
}

export default PriceFilter