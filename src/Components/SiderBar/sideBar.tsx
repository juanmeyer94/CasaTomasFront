import { useState } from "react";
import useUserContext from "../../Utils/contextUserHook";

const SideBar: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const { Filters, setFilters } = useUserContext();

  const handleAccordionToggle = (accordionId: string) => {
    setOpenAccordion(openAccordion === accordionId ? null : accordionId);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...Filters, type: e.target.value });
  };

  const handleSubsectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...Filters, subsection: e.target.value, type: "all" });
  };

  return (
    <div className="w-44 2xl:w-56 xl:w-52 lg:w-52 md:w-44 xs:w-44 bg-gray-50 text-sky-600 p-6">
      <div className="">
        <h2 className="text-xl text-center font-bold mb-2 md:text-2xl md:mb-1 xs:text-2xl border-t border-b border-solid border-sky-500">
          Máquinas de coser
        </h2>
        <div>
          <h2>
            <button
              type="button"
              className="flex text-left px-3 items-center justify-between w-full py-2 font-medium 2xl:text-xl text-md rtl:text-right text-gray-900 border-b border-gray-900 gap-3"
              data-accordion-target="#accordion-flush-body-1"
              aria-expanded={openAccordion === "accordion-1"}
              aria-controls="accordion-flush-body-1"
              onClick={() => {
                handleAccordionToggle("accordion-1");
                handleSubsectionChange({
                  target: { value: "Maquinas Industriales" },
                } as React.ChangeEvent<HTMLSelectElement>);
              }}
            >
              <span>Maquinas Industriales</span>
              <svg
                className={`w-3 h-3 ${
                  openAccordion === "accordion-1" ? "" : "rotate-180"
                } shrink-0`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-1"
            className={`${openAccordion === "accordion-1" ? "" : "hidden"}`}
          >
            <div className="py-5 border-b text-center border-gray-200 dark:border-gray-700">
              <ul className="pl-4  md:text-base">
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Rectas" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Rectas
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Overlock" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Overlock
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Collaretas" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Collaretas
                  </button>
                </li>

                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Recta y zig zag" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Recta y zig zag
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Doble arrastre" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Doble arrastre
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Triple arrastre" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Triple arrastre
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <h2 id="accordion-flush-heading-2">
            <button
              type="button"
              className="flex text-left items-center justify-between w-full py-2 px-3 font-medium rtl:text-right 2xl:text-xl text-md text-gray-900 border-b border-gray-900 gap-3"
              data-accordion-target="#accordion-flush-body-2"
              aria-expanded={openAccordion === "accordion-2"}
              aria-controls="accordion-flush-body-2"
              onClick={() => {
                handleAccordionToggle("accordion-2");
                handleSubsectionChange({
                  target: { value: "Maquinas Familiares" },
                } as React.ChangeEvent<HTMLSelectElement>);
              }}
            >
              <span>Maquinas Familiares</span>
              <svg
                data-accordion-icon
                className={`w-3 h-3 ${
                  openAccordion === "accordion-2" ? "" : "rotate-180"
                } shrink-0`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-2"
            className={`${openAccordion === "accordion-2" ? "" : "hidden"}`}
          >
            <div className="py-5 border-b text-center border-gray-200 dark:border-gray-700">
              <ul className="pl-4 text-sm md:text-base">
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Máquina de coser" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Máquina de coser
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Collareta" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Collareta
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Overlock" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Overlock
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <h2 id="accordion-flush-heading-3">
            <button
              type="button"
              className="flex text-left items-center justify-between w-full py-2 px-3 font-medium rtl:text-right 2xl:text-xl text-md text-gray-900 border-b border-gray-900 gap-3"
              data-accordion-target="#accordion-flush-body-3"
              aria-expanded={openAccordion === "accordion-3"}
              aria-controls="accordion-flush-body-3"
              onClick={() => handleAccordionToggle("accordion-3")}
            >
              <span>Repuestos y reparaciones</span>
              <svg
                data-accordion-icon
                className={`w-3 h-3 ${
                  openAccordion === "accordion-3" ? "" : "rotate-180"
                } shrink-0`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-3"
            className={`${openAccordion === "accordion-3" ? "" : "hidden"}`}
          >
            <div className="py-5 border-b border-gray-200 text-center dark:border-gray-700">
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Repuestos y reparaciones
              </p>

              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Consultar por estos medios.
              </p>
              <ul className="ps-5 text-gray-500 list-disc dark:text-gray-400">
                <li>
                  <a
                    href="https://www.facebook.com/casa.tomas.rafaela"
                    target="_blank"
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/casatomas.rafaela/?hl=es"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                    target="_blank"
                  >
                    Instagram
                  </a>
                </li>
                <a href="tel:03492422683">(03492) 422683</a>
              </ul>
            </div>
          </div>
          <br className="bg-cyan-200" />
          <h2 className="text-xl text-center font-bold mb-2 md:text-2xl md:mb-1 xs:text-2xl mt-4 border-t border-b border-solid border-sky-500">
            Mercería
          </h2>

          <h2 id="accordion-flush-heading-4">
            <button
              type="button"
              className="flex items-center justify-between w-full py-2 px-3 font-medium rtl:text-right 2xl:text-xl text-md text-gray-900 border-b border-gray-900 gap-3"
              data-accordion-target="#accordion-flush-body-4"
              aria-expanded={openAccordion === "accordion-4"}
              aria-controls="accordion-flush-body-4"
              onClick={() => {
                handleAccordionToggle("accordion-4");
                handleSubsectionChange({
                  target: { value: "Hilos" },
                } as React.ChangeEvent<HTMLSelectElement>);
              }}
            >
              <span>Hilos</span>
              <svg
                data-accordion-icon
                className={`w-3 h-3 ${
                  openAccordion === "accordion-4" ? "" : "rotate-180"
                } shrink-0`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-4"
            className={`${openAccordion === "accordion-4" ? "" : "hidden"}`}
          >
            <div className="py-5 border-b border-gray-200 text-center dark:border-gray-700">
              <ul className="pl-4 text-sm md:text-base">
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Hilos de bordar y de tejer" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Hilos de bordar y de tejer
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Hilos de costura" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Hilos de costura
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Hilos para manualidades" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Hilos para manualidades
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <h2 id="accordion-flush-heading-5">
            <button
              type="button"
              className="flex items-center justify-between w-full py-2 px-3 font-medium rtl:text-right 2xl:text-xl text-md text-gray-900 border-b border-gray-900 gap-3"
              data-accordion-target="#accordion-flush-body-5"
              aria-expanded={openAccordion === "accordion-5"}
              aria-controls="accordion-flush-body-5"
              onClick={() => {
                handleAccordionToggle("accordion-5");
                handleSubsectionChange({
                  target: { value: "Puntillas" },
                } as React.ChangeEvent<HTMLSelectElement>);
              }}
            >
              <span>Puntillas</span>
              <svg
                data-accordion-icon
                className={`w-3 h-3 ${
                  openAccordion === "accordion-5" ? "" : "rotate-180"
                } shrink-0`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-5"
            className={`${openAccordion === "accordion-5" ? "" : "hidden"}`}
          >
            <div className="py-5 border-b border-gray-200 text-center dark:border-gray-700">
              <ul className="pl-4 text-sm md:text-base">
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Puntillas de Nylon" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Puntillas de Nylon
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Puntillas de Algodon" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Puntillas de Algodon
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Puntillas de Lycra" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Puntillas de Lycra
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Puntillas de Broderie" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Puntillas de Broderie
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <h2 id="accordion-flush-heading-6">
            <button
              type="button"
              className="flex items-center justify-between w-full py-2 px-3 font-medium rtl:text-right 2xl:text-xl text-md text-gray-900 border-b border-gray-900 gap-3"
              data-accordion-target="#accordion-flush-body-6"
              aria-expanded={openAccordion === "accordion-6"}
              aria-controls="accordion-flush-body-6"
              onClick={() => {
                handleAccordionToggle("accordion-6");
                handleSubsectionChange({
                  target: { value: "Agujas" },
                } as React.ChangeEvent<HTMLSelectElement>);
              }}
            >
              <span>Agujas</span>
              <svg
                data-accordion-icon
                className={`w-3 h-3 ${
                  openAccordion === "accordion-6" ? "" : "rotate-180"
                } shrink-0`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-6"
            className={`${openAccordion === "accordion-6" ? "" : "hidden"}`}
          >
            <div className="py-5 border-b border-gray-200 text-center dark:border-gray-700">
              <ul className="pl-4 text-sm md:text-base">
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Agujas para Máquinas" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Agujas para Máquinas
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Agujas de Mano" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Agujas de mano
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Agujas de Lana" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Agujas de Lana
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Agujas de tejer y crochet" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Agujas de tejer y crochet
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Alfileres y accesorios" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Alfileres y accesorios
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <h2 id="accordion-flush-heading-7">
            <button
              type="button"
              className="flex items-center justify-between w-full py-2 px-3 font-medium rtl:text-right 2xl:text-xl text-md text-gray-900 border-b border-gray-900 gap-3"
              data-accordion-target="#accordion-flush-body-7"
              aria-expanded={openAccordion === "accordion-7"}
              aria-controls="accordion-flush-body-7"
              onClick={() => {
                handleAccordionToggle("accordion-7");
                handleSubsectionChange({
                  target: { value: "Apliques" },
                } as React.ChangeEvent<HTMLSelectElement>);
              }}
            >
              <span>Apliques</span>
              <svg
                data-accordion-icon
                className={`w-3 h-3 ${
                  openAccordion === "accordion-7" ? "" : "rotate-180"
                } shrink-0`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-7"
            className={`${openAccordion === "accordion-7" ? "" : "hidden"}`}
          >
            <div className="py-5 border-b border-gray-200 text-center dark:border-gray-700">
              <ul className="pl-4 text-sm md:text-base">
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Apliques" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Apliques
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <h2 id="accordion-flush-heading-8">
            <button
              type="button"
              className="flex items-center justify-between w-full py-2 px-3 font-medium rtl:text-right 2xl:text-xl text-md text-gray-900 border-b border-gray-900 gap-3"
              data-accordion-target="#accordion-flush-body-8"
              aria-expanded={openAccordion === "accordion-8"}
              aria-controls="accordion-flush-body-8"
              onClick={() => {
                handleAccordionToggle("accordion-8");
                handleSubsectionChange({
                  target: { value: "Reparadores" },
                } as React.ChangeEvent<HTMLSelectElement>);
              }}
            >
              <span>Reparadores</span>
              <svg
                data-accordion-icon
                className={`w-3 h-3 ${
                  openAccordion === "accordion-8" ? "" : "rotate-180"
                } shrink-0`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-8"
            className={`${openAccordion === "accordion-8" ? "" : "hidden"}`}
          >
            <div className="py-5 border-b border-gray-200 text-center dark:border-gray-700">
              <ul className="pl-4 text-sm md:text-base">
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Parches y reparadores" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Parches y reparadores
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <h2 id="accordion-flush-heading-9">
            <button
              type="button"
              className="flex items-center justify-between w-full py-2 px-3 font-medium rtl:text-right 2xl:text-xl text-md text-gray-900 border-b border-gray-900 gap-3"
              data-accordion-target="#accordion-flush-body-9"
              aria-expanded={openAccordion === "accordion-9"}
              aria-controls="accordion-flush-body-9"
              onClick={() => {
                handleAccordionToggle("accordion-9");
                handleSubsectionChange({
                  target: { value: "Elásticos" },
                } as React.ChangeEvent<HTMLSelectElement>);
              }}
            >
              <span>Elásticos</span>
              <svg
                data-accordion-icon
                className={`w-3 h-3 ${
                  openAccordion === "accordion-9" ? "" : "rotate-180"
                } shrink-0`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-9"
            className={`${openAccordion === "accordion-9" ? "" : "hidden"}`}
          >
            <div className="py-5 border-b border-gray-200 text-center dark:border-gray-700">
              <ul className="pl-4 text-sm md:text-base">
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Elásticos de Algodon" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Elásticos de Algodon
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Elásticos de Poliester" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Elásticos de Poliester
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Elásticos Redondos" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Elásticos Redondos
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Elásticos Afelpados" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Elásticos Afelpados
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Elásticos de Bretel" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Elásticos Bretel
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Elásticos Quebrados" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Elásticos Quebrados
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Elásticos Lencería" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Elásticos Lencería
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <h2 id="accordion-flush-heading-10">
            <button
              type="button"
              className="flex items-center justify-between w-full py-2 px-3 font-medium rtl:text-right 2xl:text-xl text-md text-gray-900 border-b border-gray-900 gap-3"
              data-accordion-target="#accordion-flush-body-10"
              aria-expanded={openAccordion === "accordion-10"}
              aria-controls="accordion-flush-body-10"
              onClick={() => {
                handleAccordionToggle("accordion-10");
                handleSubsectionChange({
                  target: { value: "Tijeras" },
                } as React.ChangeEvent<HTMLSelectElement>);
              }}
            >
              <span>Tijeras</span>
              <svg
                data-accordion-icon
                className={`w-3 h-3 ${
                  openAccordion === "accordion-10" ? "" : "rotate-180"
                } shrink-0`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-10"
            className={`${openAccordion === "accordion-10" ? "" : "hidden"}`}
          >
            <div className="py-5 border-b border-gray-200 text-center dark:border-gray-700">
              <ul className="pl-4 text-sm md:text-base">
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Tijeras" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Tijeras
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Herramientas" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Herramientas
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <h2 id="accordion-flush-heading-11">
            <button
              type="button"
              className="flex text-left items-center justify-between w-full py-2 px-3 font-medium rtl:text-right 2xl:text-xl text-md text-gray-900 border-b border-gray-900 gap-3"
              data-accordion-target="#accordion-flush-body-11"
              aria-expanded={openAccordion === "accordion-11"}
              aria-controls="accordion-flush-body-11"
              onClick={() => {
                handleAccordionToggle("accordion-11");
                handleSubsectionChange({
                  target: { value: "Lubricantes y pegamentos" },
                } as React.ChangeEvent<HTMLSelectElement>);
              }}
            >
              <span>Lubricantes y pegamentos</span>
              <svg
                data-accordion-icon
                className={`w-3 h-3 ${
                  openAccordion === "accordion-11" ? "" : "rotate-180"
                } shrink-0`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-11"
            className={`${openAccordion === "accordion-11" ? "" : "hidden"}`}
          >
            <div className="py-5 border-b border-gray-200 text-center dark:border-gray-700">
              <ul className="pl-4 text-sm md:text-base">
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Lubricantes" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Lubricantes
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Pegamento" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Pegamento
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <h2 id="accordion-flush-heading-12">
            <button
              type="button"
              className="flex items-center justify-between w-full py-2 px-3 font-medium rtl:text-right 2xl:text-xl text-md text-gray-900 border-b border-gray-900 gap-3"
              data-accordion-target="#accordion-flush-body-12"
              aria-expanded={openAccordion === "accordion-12"}
              aria-controls="accordion-flush-body-12"
              onClick={() => {
                handleAccordionToggle("accordion-12");
                handleSubsectionChange({
                  target: { value: "Cintas" },
                } as React.ChangeEvent<HTMLSelectElement>);
              }}
            >
              <span>Cintas</span>
              <svg
                data-accordion-icon
                className={`w-3 h-3 ${
                  openAccordion === "accordion-12" ? "" : "rotate-180"
                } shrink-0`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-12"
            className={`${openAccordion === "accordion-12" ? "" : "hidden"}`}
          >
            <div className="py-5 border-b border-gray-200 text-center dark:border-gray-700">
              <ul className="pl-4 text-sm md:text-base">
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Cinta de Raso" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Cinta de Raso
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Cinta Gross" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Cinta Gross
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Cinta Bies" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Cinta Bies
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Cinta Mochilera" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Cinta Mochilera
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Cinta Fantasía" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Cinta Fantasía
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Cinta Hilera" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Cinta Hilera
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <h2 id="accordion-flush-heading-13">
            <button
              type="button"
              className="flex items-center justify-between w-full py-2 px-3 font-medium rtl:text-right 2xl:text-xl text-md text-gray-900 border-b border-gray-900 gap-3"
              data-accordion-target="#accordion-flush-body-13"
              aria-expanded={openAccordion === "accordion-13"}
              aria-controls="accordion-flush-body-13"
              onClick={() => {
                handleAccordionToggle("accordion-13");
                handleSubsectionChange({
                  target: { value: "Cierres" },
                } as React.ChangeEvent<HTMLSelectElement>);
              }}
            >
              <span>Cierres</span>
              <svg
                data-accordion-icon
                className={`w-3 h-3 ${
                  openAccordion === "accordion-13" ? "" : "rotate-180"
                } shrink-0`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-13"
            className={`${openAccordion === "accordion-13" ? "" : "hidden"}`}
          >
            <div className="py-5 border-b border-gray-200 text-center dark:border-gray-700">
              <ul className="pl-4 text-sm md:text-base">
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Cierre Común Fijo" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Cierre Común Fijo
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Cierre Reforzado Fijo" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Cierre Reforzado Fijo
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Cierre Reforzado Desmontable" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Cierre Reforzado Desmontable
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Cierre D. de Perro" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Cierre D. de Perro
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Cierre Perrito" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Cierre Perrito
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Cierre de Aluminio y Empavonado" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Cierre de Aluminio y Empavonado
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Cierre Fijo Bronce" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Cierre Fijo Bronce
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Cierre Invisible" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Cierre Inivisible
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Cierre por Metro y Deslizadores" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Cierre por Metro y Deslizadores
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <h2 id="accordion-flush-heading-14">
            <button
              type="button"
              className="flex items-center justify-between w-full py-2 px-3 font-medium rtl:text-right 2xl:text-xl text-md text-gray-900 border-b border-gray-900 gap-3"
              data-accordion-target="#accordion-flush-body-14"
              aria-expanded={openAccordion === "accordion-14"}
              aria-controls="accordion-flush-body-14"
              onClick={() => {
                handleAccordionToggle("accordion-14");
                handleSubsectionChange({
                  target: { value: "Cordones" },
                } as React.ChangeEvent<HTMLSelectElement>);
              }}
            >
              <span>Cordones</span>
              <svg
                data-accordion-icon
                className={`w-3 h-3 ${
                  openAccordion === "accordion-13" ? "" : "rotate-180"
                } shrink-0`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-14"
            className={`${openAccordion === "accordion-14" ? "" : "hidden"}`}
          >
            <div className="py-5 border-b border-gray-200 text-center dark:border-gray-700">
              <ul className="pl-4 text-sm md:text-base">
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Cordón de Zapato" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Cordón de Zapato
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Cordón de Zapatilla" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Cordón de Zapatilla
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Cordón de Borcego" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Cordón de Borcego
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Cordón de Polipropireno" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Cordón Polipropireno
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    className="hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm"
                    onClick={() =>
                      handleTypeChange({
                        target: { value: "Cordón de Raso" },
                      } as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    Cordón de Raso
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
