const NotAllowed = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Przepraszamy!</h1>
      <p className="text-lg text-gray-700 mb-2">
        Nie masz dostępu do tej strony.
      </p>
      <p className="text-gray-500 max-w-md">
        Ta sekcja jest zarezerwowana tylko dla administratorów. Jeśli uważasz, że to błąd, skontaktuj się z administratorem systemu.
      </p>
    </div>
  )
}

export default NotAllowed;
