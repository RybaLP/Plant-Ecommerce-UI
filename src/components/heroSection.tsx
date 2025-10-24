const HeroSection = () => {
  return (
    <section className="bg-white py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">

        {/* BLOK 1 */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg flex-1 group">
          <img
            src="/garden.jpg"
            alt="Ogród z roślinami"
            className="w-full h-80 md:h-[480px] object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bg-green-900 bg-opacity-60 flex flex-col justify-end p-6 md:p-8 text-white">
            <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-4 drop-shadow-lg">
              Nasze rośliny<br />w ogrodach i sadach<br />naszych klientów
            </h2>
            <a
              href="/realizacje"
              className="bg-white text-green-900 font-semibold px-6 py-2 md:px-8 md:py-3 rounded-full hover:bg-gray-100 transition-colors duration-300 w-max"
            >
              Sprawdź
            </a>
          </div>
        </div>

        {/* BLOK 2 */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg flex-1 group">
          <img
            src="/nature.jpg"
            alt="Voucher ogrodowy"
            className="w-full h-80 md:h-[480px] object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute  bg-black bg-opacity-40 flex flex-col justify-end items-end p-6 md:p-8 text-right text-white">
            <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-4 drop-shadow-lg">
              Voucher<br />dla miłośników<br />ogrodów
            </h2>
            <a
              href="/vouchery"
              className="bg-white text-green-900 font-semibold px-6 py-2 md:px-8 md:py-3 rounded-full hover:bg-gray-100 transition-colors duration-300 w-max"
            >
              Sprawdź
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
