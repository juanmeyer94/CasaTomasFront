import type React from "react"
import { useState } from "react"
import { X, ChevronRight } from "lucide-react"
import useUserContext from "../../Utils/contextUserHook"

type Category = {
  name: string
  subcategories: Subcategory[]
}

type Subcategory = {
  name: string
  types: string[]
  specialContent?: React.ReactNode
}

interface MobileCategoryButtonsProps {
  categories: Category[]
}

const MobileCategoryButtons: React.FC<MobileCategoryButtonsProps> = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const { Filters, setFilters } = useUserContext()

  // Función para abrir el modal con la categoría seleccionada
  const openCategoryModal = (categoryName: string) => {
    setActiveCategory(categoryName)
    setActiveSubcategory(null)
    setShowModal(true)
  }

  // Función para cerrar el modal
  const closeModal = () => {
    setShowModal(false)
    setActiveSubcategory(null)
  }

  // Función para manejar la selección de subcategoría
  const handleSubcategorySelect = (subcategoryName: string) => {
    // Si ya está seleccionada, la deseleccionamos
    if (activeSubcategory === subcategoryName) {
      setActiveSubcategory(null)
      return
    }

    setActiveSubcategory(subcategoryName)

    // Solo establecemos el filtro si no tiene contenido especial
    const category = categories.find((cat) => cat.name === activeCategory)
    const subcategory = category?.subcategories.find((sub) => sub.name === subcategoryName)

    if (subcategory && !subcategory.specialContent) {
      setFilters({ ...Filters, subsection: subcategoryName, type: "all" })
    }
  }

  // Función para manejar la selección de tipo
  const handleTypeSelect = (type: string) => {
    setFilters({ ...Filters, type })
    closeModal() // Cerramos el modal después de seleccionar
  }

  // Encontrar la categoría activa
  const activeCategoryData = categories.find((cat) => cat.name === activeCategory)

  return (
    <>
      {/* Botones de categoría - siempre visibles en móvil */}
      <div className="absolute top-16 left-0 right-0 z-40 flex justify-center gap-2 p-1 mt-4 bg-sky-100 shadow-md sm:hidden">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => openCategoryModal(category.name)}
            className={`flex-1 py-2 rounded-md text-white font-medium text-center transition-colors ${
              activeCategory === category.name && showModal ? "bg-sky-700" : "bg-sky-600 hover:bg-sky-700"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Modal */}
      {showModal && activeCategoryData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center sm:hidden">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeModal}></div>

          {/* Modal content */}
          <div className="relative w-11/12 max-h-[80vh] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-sky-600 text-white">
              <h3 className="text-lg font-semibold">{activeCategoryData.name}</h3>
              <button onClick={closeModal} className="p-1 rounded-full hover:bg-sky-700 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal body */}
            <div className="flex-1 overflow-y-auto">
              {activeCategoryData.subcategories.map((subcategory, subIndex) => (
                <div key={subIndex} className="border-b border-gray-200 last:border-b-0">
                  <button
                    onClick={() => handleSubcategorySelect(subcategory.name)}
                    className={`flex items-center justify-between w-full p-4 text-left font-medium transition-colors ${
                      activeSubcategory === subcategory.name
                        ? "bg-sky-50 text-sky-700"
                        : "text-sky-600 hover:bg-gray-50"
                    }`}
                  >
                    <span>{subcategory.name}</span>
                    {activeSubcategory === subcategory.name ? (
                      <X className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>

                  {activeSubcategory === subcategory.name && (
                    <div className="p-3 bg-gray-50">
                      {subcategory.specialContent ? (
                        subcategory.specialContent
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          {subcategory.types.map((type, typeIndex) => (
                            <button
                              key={typeIndex}
                              onClick={() => handleTypeSelect(type)}
                              className="p-3 text-left text-gray-700 bg-white rounded-md shadow-sm hover:bg-sky-50 hover:text-sky-600 transition-colors"
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Espaciador para compensar los botones fijos */}
      <div className="h-16 sm:h-0 block sm:hidden"></div>
    </>
  )
}

export default MobileCategoryButtons

