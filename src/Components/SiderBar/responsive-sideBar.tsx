import type React from "react"
import SideBar from "./sideBar"
import MobileCategoryButtons from "./mobile-sideBar"

type Category = {
  name: string
  subcategories: Subcategory[]
}

type Subcategory = {
  name: string
  types: string[]
  specialContent?: React.ReactNode
}

interface ResponsiveSidebarProps {
  categories: Category[]
}

const ResponsiveSidebar: React.FC<ResponsiveSidebarProps> = ({ categories }) => {
    return (
      <>
        {/* Botones de categoría para móvil - ahora con mejor integración */}
        <div className="sm:hidden pt-20">
          <MobileCategoryButtons categories={categories} />
        </div>
  
        {/* Sidebar tradicional solo para escritorio */}
        <div className="hidden sm:block">
          <SideBar />
        </div>
      </>
    )
  }
export default ResponsiveSidebar


