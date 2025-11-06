const CompanyDescription = () => {
  const sections = [
    {
      image: "/plants-photo.jpg",
      alt: "Rośliny",
      title: "Pasja od pokoleń",
      text: "W Roślinnym Domu oferujemy starannie wyselekcjonowane rośliny, które łączą w sobie urodę, trwałość i odporność na zmienne warunki klimatyczne. Nasza podkarpacka szkółka od lat z pasją zajmuje się uprawą roślin, dbając o każdą sadzonkę tak, aby po posadzeniu mogła zdrowo rosnąć i rozwijać się przez wiele sezonów.",
      color: "from-emerald-500 to-green-600",
      icon: "🌿"
    },
    {
      image: "/ecommerce.jpg",
      alt: "Sklep internetowy", 
      title: "Nowoczesny dostęp",
      text: "Rozszerzyliśmy działalność o sklep internetowy, który pozwala wygodnie zamówić wymarzone rośliny bez wychodzenia z domu. Każda przesyłka jest przygotowywana z najwyższą starannością – rośliny są odpowiednio zabezpieczane i pakowane, by dotarły w idealnym stanie, gotowe do dalszego wzrostu i ozdabiania ogrodu czy balkonu.",
      color: "from-amber-500 to-orange-500",
      icon: "💻"
    },
    {
      image: "/office.jpg",
      alt: "Biuro",
      title: "Bogata kolekcja",
      text: "W ofercie znajdują się byliny, krzewy liściaste, krzewy iglaste, rośliny ozdobne oraz owocowe, a także gatunki dedykowane różnorodnym aranżacjom ogrodowym – od przestronnych ogrodów po niewielkie balkony i tarasy. Każda roślina pochodzi z naszej własnej uprawy i jest gotowa, by stać się pięknym elementem zielonej przestrzeni.",
      color: "from-purple-500 to-indigo-600",
      icon: "🌺"
    },
    {
      image: "/planting-plant.jpg", 
      alt: "Sadzenie roślin",
      title: "Dla każdego ogrodnika",
      text: "Rośliny z Roślinnego Domu to propozycja zarówno dla doświadczonych ogrodników, jak i dla osób rozpoczynających przygodę z ogrodem. Wierzymy, że każda przestrzeń może stać się miejscem odpoczynku, harmonii i codziennego kontaktu z naturą. Zapraszamy do odkrywania naszej oferty i tworzenia zielonych zakątków, które będą cieszyć oczy i serce przez wiele lat.",
      color: "from-blue-500 to-cyan-600",
      icon: "👨‍🌾"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-emerald-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Nagłówek sekcji */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-4">
            Nasza Historia
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Odkryj pasję i zaangażowanie stojące za każdą rośliną z Roślinnego Domu
          </p>
        </div>

        <div className="space-y-20">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center gap-8 lg:gap-12 opacity-0 animate-fade-in`}
            >
              {/* Tekst */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${section.color} shadow-lg`}>
                    <span className="text-2xl">{section.icon}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                    {section.title}
                  </h3>
                </div>
                
                <p className="text-lg text-gray-700 leading-relaxed font-light">
                  {section.text}
                </p>
                
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />
                  <span>Roślinny Dom</span>
                </div>
              </div>

              {/* Zdjęcie */}
              <div className="flex-1 relative group">
                <div className={`absolute -inset-4 bg-gradient-to-r ${section.color} rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500`} />
                <img
                  src={section.image}
                  alt={section.alt}
                  className="relative rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-700 group-hover:rotate-1 border-4 border-white"
                />
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/50 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes fade-in {
          from { 
            opacity: 0; 
            transform: translateY(40px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        /* Opóźnienia dla kolejnych sekcji */
        .animate-fade-in:nth-child(1) { animation-delay: 0.1s; }
        .animate-fade-in:nth-child(2) { animation-delay: 0.3s; }
        .animate-fade-in:nth-child(3) { animation-delay: 0.5s; }
        .animate-fade-in:nth-child(4) { animation-delay: 0.7s; }
      `}</style>
    </section>
  );
};

export default CompanyDescription;