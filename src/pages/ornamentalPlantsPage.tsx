import { useState } from "react"
import type { FilterType } from "../types/filterType"
import type { Plant } from "../interfaces/plant";
import { useAuthenticationStore } from "../store/authenticationStore";
import { useCartStore } from "../store/useCartStore";
import { useCart } from "../hooks/useCart";
import PriceFilter from "../components/priceFilter";
import ProductCard from "../components/productCard";
import { usePlantsByCategory } from "../hooks/usePlantsByCategory";
import type { PlantType } from "../types/plantType";

const OrnamentalPlantsPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [filterType, setFilterType] = useState<FilterType>("default");
    
    const { data: plantsData, isLoading } = usePlantsByCategory("ORNAMENTAL" as PlantType, currentPage);

    const { isAuthenticated } = useAuthenticationStore();
    const { addMutate } = useCart();
    const { addItem } = useCartStore();

    const plantsList: Plant[] = plantsData?.content || [];
    const totalPages = plantsData?.totalPages || 1;
    const totalPlants = plantsData?.totalElements || 0;

    const sortedPlants: Plant[] = [...plantsList].sort((a, b) => {
        switch (filterType) {
            case "asc": 
                return a.price - b.price;
            case "desc":
                return b.price - a.price;
            case "highAmount":
                return b.quantityInStock - a.quantityInStock;
            case "lowAmount":
                return a.quantityInStock - b.quantityInStock;
            default:
                return 0;
        }
    });

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleAddToCart = (items: { plantId: number, quantity: number, plant: Plant }) => {
        if (isAuthenticated) {
            addMutate.mutate({ plantId: items.plantId, quantity: items.quantity, plant: items.plant });
        } else {
            addItem({ plantId: items.plantId, plant: items.plant, quantity: items.quantity });
        }
    }

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        const pages = [];
        const maxVisiblePages = 5;
        
        let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(0, endPage - maxVisiblePages + 1);
        }

        if (currentPage > 0) {
            pages.push(
                <button
                    key="prev"
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-800 transition-colors"
                    disabled={isLoading}
                >
                    ←
                </button>
            );
        }

        if (startPage > 0) {
            pages.push(
                <button
                    key={0}
                    onClick={() => handlePageChange(0)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-800 transition-colors"
                    disabled={isLoading}
                >
                    1
                </button>
            );
            if (startPage > 1) {
                pages.push(
                    <span key="ellipsis1" className="px-2 py-2 text-gray-400">
                        ...
                    </span>
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    disabled={isLoading}
                    className={`px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                        currentPage === i
                            ? 'bg-green-600 text-white border-green-600 shadow-sm'
                            : 'text-gray-600 bg-white border-gray-300 hover:bg-gray-50 hover:text-gray-800'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {i + 1} 
                </button>
            );
        }

        if (endPage < totalPages - 1) {
            if (endPage < totalPages - 2) {
                pages.push(
                    <span key="ellipsis2" className="px-2 py-2 text-gray-400">
                        ...
                    </span>
                );
            }
            pages.push(
                <button
                    key={totalPages - 1}
                    onClick={() => handlePageChange(totalPages - 1)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-800 transition-colors"
                    disabled={isLoading}
                >
                    {totalPages}
                </button>
            );
        }

        if (currentPage < totalPages - 1) {
            pages.push(
                <button
                    key="next"
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-800 transition-colors"
                    disabled={isLoading}
                >
                    →
                </button>
            );
        }

        return pages;
    };

    if (isLoading && currentPage === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Ładowanie roślin ozdobnych...</p>
                </div>
            </div>
        );
    }

    if (plantsList.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md mx-auto">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-3xl">🌸</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Brak roślin ozdobnych</h2>
                    <p className="text-gray-600">Aktualnie nie mamy dostępnych roślin ozdobnych w ofercie.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Rośliny Ozdobne</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Odkryj naszą kolekcję pięknych roślin ozdobnych, które dodadzą uroku każdemu ogrodowi
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <div className="text-gray-600">
                    </div>
                    <div className="flex items-center gap-4">
                        <PriceFilter onChange={setFilterType} defaultOrder="default" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {sortedPlants.map((plant) => (
                        <ProductCard
                            key={plant.id}
                            plant={plant}
                            handleAddToCart={handleAddToCart}
                        />
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center">
                        <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-2 shadow-sm">
                            {renderPagination()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrnamentalPlantsPage;