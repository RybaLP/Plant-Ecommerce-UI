const CompanyDescription = () => {
  return (
    <section className="flex flex-col items-center px-6 py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl flex flex-col items-center space-y-16">

        {/* block 1 */}
        <div className="max-w-4xl flex flex-col md:flex-row items-center gap-10 opacity-0 animate-fade-in">
          <div className="max-w-xl text-gray-700 text-lg md:text-xl font-light leading-relaxed">
            W Roślinnym Domu oferujemy starannie wyselekcjonowane rośliny, które łączą w sobie urodę,
            trwałość i odporność na zmienne warunki klimatyczne. Nasza podkarpacka szkółka od
            lat z pasją zajmuje się uprawą roślin,
            dbając o każdą sadzonkę tak, aby po posadzeniu mogła zdrowo
            rosnąć i rozwijać się przez wiele sezonów.
          </div>

          <img
            src="/plants-photo.jpg"
            alt="Rośliny"
            width={400}
            height={400}
            className="rounded-2xl border border-green-300 shadow-md hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* block 2 */}
        <div className="max-w-4xl flex flex-col-reverse md:flex-row items-center gap-10 opacity-0 animate-fade-in">
          <img
            src="/ecommerce.jpg"
            alt="Sklep internetowy"
            width={400}
            height={400}
            className="rounded-2xl border border-green-300 shadow-md hover:scale-105 transition-transform duration-700"
          />
          <div className="max-w-xl text-gray-700 text-lg md:text-xl font-light leading-relaxed">
            Rozszerzyliśmy działalność o sklep internetowy, który pozwala wygodnie zamówić wymarzone rośliny bez wychodzenia z domu.
            Każda przesyłka jest przygotowywana z najwyższą starannością – rośliny są odpowiednio zabezpieczane i pakowane, by dotarły
            w idealnym stanie, gotowe do dalszego wzrostu i ozdabiania ogrodu czy balkonu.
          </div>
        </div>

        {/* block 3 */}
        <div className="max-w-4xl flex flex-col md:flex-row items-center gap-10 opacity-0 animate-fade-in">
          <div className="max-w-xl text-gray-700 text-lg md:text-xl font-light leading-relaxed">
            W ofercie znajdują się byliny, krzewy liściaste, krzewy iglaste, rośliny ozdobne oraz owocowe, a także gatunki dedykowane różnorodnym aranżacjom ogrodowym – od przestronnych ogrodów po niewielkie balkony i tarasy.
            Każda roślina pochodzi z naszej własnej uprawy i jest gotowa, by stać się pięknym elementem zielonej przestrzeni.
          </div>

          <img
            src="/office.jpg"
            alt="Biuro"
            width={400}
            height={400}
            className="rounded-2xl border border-green-300 shadow-md hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* block 4 */}
        <div className="max-w-4xl flex flex-col-reverse md:flex-row items-center gap-10 opacity-0 animate-fade-in">
          <img
            src="/planting-plant.jpg"
            alt="Sadzenie roślin"
            width={400}
            height={400}
            className="rounded-2xl border border-green-300 shadow-md hover:scale-105 transition-transform duration-700"
          />
          <div className="max-w-xl text-gray-700 text-lg md:text-xl font-light leading-relaxed">
            Rośliny z Roślinnego Domu to propozycja zarówno dla doświadczonych ogrodników, jak i dla osób rozpoczynających przygodę z ogrodem.
            Wierzymy, że każda przestrzeń może stać się miejscem odpoczynku, harmonii i codziennego kontaktu z naturą.
            Zapraszamy do odkrywania naszej oferty i tworzenia zielonych zakątków, które będą cieszyć oczy i serce przez wiele lat.
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default CompanyDescription;
