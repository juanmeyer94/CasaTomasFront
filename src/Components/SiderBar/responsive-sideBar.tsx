import type React from "react"
import SideBar from "./sideBar"
import MobileCategoryButtons from "./mobile-sideBar"
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

interface ResponsiveSidebarProps {
  categories: Category[]
}

const ResponsiveSidebar: React.FC<ResponsiveSidebarProps> = ({ categories }) => {
  const {loading} = useUserContext();
    return (
      <>
        {/* Botones de categoría para móvil - ahora con mejor integración */}
        <div className="sm:hidden pt-20">
          <MobileCategoryButtons categories={categories} />
        </div>
  
        {/* Sidebar tradicional solo para escritorio */}
        <div className="hidden sm:block">
         {!loading ?  <SideBar />: ""}
        </div>
      </>
    )
  }
export default ResponsiveSidebar


