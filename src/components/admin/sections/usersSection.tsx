import { useFindAllUsers } from "../../../hooks/admin-hooks/useFindAllUsers"
import UserCard from "../comp/userCard";
import { useState } from 'react';

const UsersSection = () => {
    const { data: users, isLoading, isError } = useFindAllUsers();
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 12;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h3 className="text-lg font-medium text-red-800 mb-2">Błąd ładowania</h3>
                <p className="text-red-600">Wystąpił problem podczas ładowania listy użytkowników.</p>
            </div>
        );
    }

    if (!users || users.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Brak użytkowników</h3>
                <p className="text-gray-500">Nie znaleziono żadnych użytkowników w systemie.</p>
            </div>
        );
    }

    // Paginacja
    const totalPages = Math.ceil(users.length / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const currentUsers = users.slice(startIndex, startIndex + usersPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Przycisk "Poprzednia"
        if (currentPage > 1) {
            buttons.push(
                <button
                    key="prev"
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                >
                    ←
                </button>
            );
        }

        // Pierwsza strona
        if (startPage > 1) {
            buttons.push(
                <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                >
                    1
                </button>
            );
            if (startPage > 2) {
                buttons.push(
                    <span key="ellipsis1" className="px-3 py-2 text-sm text-gray-500">
                        ...
                    </span>
                );
            }
        }

        // Przyciski stron
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-2 text-sm font-medium border rounded-lg ${
                        currentPage === i
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                    }`}
                >
                    {i}
                </button>
            );
        }

        // Ostatnia strona
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                buttons.push(
                    <span key="ellipsis2" className="px-3 py-2 text-sm text-gray-500">
                        ...
                    </span>
                );
            }
            buttons.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                >
                    {totalPages}
                </button>
            );
        }

        // Przycisk "Następna"
        if (currentPage < totalPages) {
            buttons.push(
                <button
                    key="next"
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                >
                    →
                </button>
            );
        }

        return buttons;
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Użytkownicy</h1>
                    <p className="text-gray-600 mt-1">
                        {users.length} {users.length === 1 ? 'użytkownik' : users.length < 5 ? 'użytkowników' : 'użytkowników'} w systemie
                        {" "}(strona {currentPage} z {totalPages})
                    </p>
                </div>
            </div>

            {/* Grid użytkowników */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentUsers.map((user, index) => (
                    <UserCard key={`${user.phoneNumber}-${index}`} user={user} />
                ))}
            </div>

            {/* Paginacja */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 pt-6 border-t border-gray-200">
                    <div className="flex items-center space-x-1">
                        {renderPaginationButtons()}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UsersSection;