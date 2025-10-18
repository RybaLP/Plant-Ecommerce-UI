
const EmptyCart = () => {
  return (
    <section className="min-h-[400px] flex flex-col md:flex-row items-center justify-center p-8">
        <div className="text-center md:text-left md:pt-12 mb-8 md:bg-0">
            <h2 className="text-4xl font-bold mb-4">Twoj koszyk jest pusty</h2>
            <p className="text-gray-400 max-w-lg mb-2">
                Dodaj do koszyka przedmioty i kup je szybko i wygodnie
            </p>

            <p className="text-gray-400 max-w-lg">
                Przez koszyk możesz kupić za jednym razem do 50 przedmiotów od różnych sprzedawców.
            </p>
        </div>

    </section>
  )
}

export default EmptyCart