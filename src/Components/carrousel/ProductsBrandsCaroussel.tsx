import companies from "../../../public/productsBrands.json";

export default function ProductsBrandsCarrousel() {
  const duplicatedCompanies = [...companies, ...companies]; // Duplicamos las compañías para un scroll infinito
  const mainCompanies = companies.slice(0, 4);

  return (
    <div className="flex flex-col p-[7%]">
      <h3 className="flex relative justify-center font-bold text-4xl text-center font-manrope mb-[2%]">
        Somos representantes oficiales de....
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center">
        {mainCompanies.map((company: any) => (
          <div
            key={company.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex items-center justify-center"
          >
            <img
              src={company.logo}
              alt={`Logo de ${company.id}`}
              className="h-[2rem] md:h-[3rem] w-full object-contain"
            />
          </div>
        ))}
      </div>

      <div>
        <p className="flex relative justify-center font-bold text-2xl text-center font-manrope my-[2%]">
          ¡También trabajamos con todas estas marcas y muchas más!
        </p>
      </div>
      <div className="relative overflow-hidden w-[80%] mx-auto">
        <div className="flex animate-infinite-scroll">
          {duplicatedCompanies.map((company, index) => (
            <div key={`${company.id}-${index}`} className="flex-none mx-4">
              <img
                src={company.logo}
                alt={`Logo de ${company.id}`}
                className="h-[3rem] lg:h-[5rem] w-[5rem] lg:w-[8rem] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
