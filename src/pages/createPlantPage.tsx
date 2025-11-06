import { useState } from "react"
import type { PlantType } from "../types/plantType"
import type { PlantRequest } from "../interfaces/requests/plantRequest"

const CreatePlantPage = () => {
    const [formData, setFormData] = useState<PlantRequest>({
        category: "CONIFEROUS",
        name: "",
        description: "",
        quantityInStock: 0,
        price: 0,
        imageUrl: "",
        size: ""
    })

    const [sizeValue, setSizeValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }))
    }

    const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSizeValue(value) 
        
        setFormData(prev => ({
            ...prev,
            size: value ? `${value}cm` : ""
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Dane do wysłania:", formData)
    }

    const handleClear = () => {
        setFormData({
            category: "CONIFEROUS",
            name: "",
            description: "",
            quantityInStock: 0,
            price: 0,
            imageUrl: "",
            size: ""
        })
        setSizeValue("") 
    }

    const plantCategories: PlantType[] = [
        "CONIFEROUS", "FLOWERING", "FRUIT", "DECIDUOUS", "HERBAL", "OTHER"
    ]

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Dodaj nową roślinę</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nazwa rośliny *
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Np. Monstera Deliciosa"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cena (zł) *
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ilość w magazynie *
                        </label>
                        <input
                            type="number"
                            name="quantityInStock"
                            value={formData.quantityInStock}
                            onChange={handleChange}
                            min="1"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Kategoria *
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                            {plantCategories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rozmiar (cm) *
                        </label>
                        <div className="relative">
                            <input 
                                type="number"
                                value={sizeValue}
                                onChange={handleSizeChange}
                                min="1"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                                placeholder="15"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <span className="text-gray-500">cm</span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Wysokość rośliny w centymetrach
                        </p>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL obrazka *
                    </label>
                    <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Opis *
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Opis rośliny, wymagania pielęgnacyjne..."
                    />
                </div>

                {sizeValue && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-sm text-green-800">
                            <span className="font-medium">Rozmiar rośliny:</span> {formData.size}
                        </p>
                    </div>
                )}

                <div className="flex justify-end space-x-4 pt-4">
                    <button
                        type="button"
                        onClick={handleClear}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Wyczyść
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
                    >
                        Dodaj roślinę
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreatePlantPage