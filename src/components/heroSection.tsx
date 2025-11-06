const HeroSection = () => {
  return (
    <section className="bg-white py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">

        <div className="relative rounded-2xl overflow-hidden shadow-lg flex-1 group">
          <img
            src="/garden.jpg"
            alt="Ogród z roślinami"
            className="w-full h-80 md:h-[480px] object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-green-900/50 p-6 md:p-8 text-white">
            <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-4">
              Nasze rośliny<br />w ogrodach i sadach<br />naszych klientów
            </h2>
            
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-lg flex-1 group">
          <img
            src="/nature.jpg"
            alt="Voucher ogrodowy"
            className="w-full h-80 md:h-[480px] object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-6 md:p-8 text-white text-right">
            <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-4">
              Voucher<br />dla miłośników<br />ogrodów
            </h2>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;