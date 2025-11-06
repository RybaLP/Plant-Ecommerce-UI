const PlantTypesInOffer = () => {
  const plantTypes = [
    { name: "Owocowe", image: "https://res.cloudinary.com/du8wbkwwq/image/upload/v1762202341/owocowa_a8ltp2.png", link: "/rosliny/owocowe" },
    { name: "Liściaste", image: "https://res.cloudinary.com/du8wbkwwq/image/upload/v1762202335/lisciasta_riunml.png", link: "/rosliny/lisciaste" },
    { name: "Iglaste", image: "https://res.cloudinary.com/du8wbkwwq/image/upload/v1762202336/iglasta_gpnu7f.png", link: "/rosliny/iglaste" },
    { name: "Ozdobne", image: "https://res.cloudinary.com/du8wbkwwq/image/upload/v1762202336/ozdobna_tzhmbm.png", link: "/rosliny/ozdobne" }
  ];

  return (
    <section className="py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-center mb-6 text-gray-800">Nasze Kategorie Roślin</h2>
        
        <div className="grid grid-cols-2 gap-3">
          {plantTypes.map((plant, index) => (
            <a
              key={index}
              href={plant.link}
              className="group relative block aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={plant.image}
                alt={`Rośliny ${plant.name}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay z napisem */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white font-bold text-lg drop-shadow-lg text-center">
                  {plant.name}
                </h3>
              </div>

              {/* Efekt hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white group-hover:border-opacity-50 rounded-lg transition-all duration-300" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlantTypesInOffer;