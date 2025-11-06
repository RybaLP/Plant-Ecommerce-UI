import type { UserResponse } from "../../../interfaces/responses/userResponse"

interface Props {
    user: UserResponse
}

const UserCard = ({ user }: Props) => {
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                    {user.firstName} {user.lastName}
                </h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Aktywny
                </span>
            </div>

            <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-sm">{user.phoneNumber}</span>
                </div>

                {user.address && (
                    <div className="flex items-start text-gray-600">
                        <svg className="w-4 h-4 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div className="text-sm">
                            <p>{user.address.city}</p>
                            <p>{user.address.country}</p>
                            <p>{user.address.postalCode}</p>
                            <p>{user.address.street}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                    Zarejestrowano: {formatDate(user.registrationDate)}
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200">
                    Szczegóły →
                </button>
            </div>
        </div>
    );
}

export default UserCard;