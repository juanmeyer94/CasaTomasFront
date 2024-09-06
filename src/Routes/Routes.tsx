import { Navigate, useRoutes } from "react-router-dom";
import AboutUs from "../Components/AboutUs/aboutUs";
import ProductDetail from "../Components/Card/moreInfoCard";
import BuyCart from "../Components/Cart/buyCart";
import ContactPage from "../Components/Contact/Contact";
import GeneralContainer from "../Components/Containers/generalContainer"
import DashContainer from "../Components/Dashboard/dashboardContainer";
import FAQ from "../Components/FAQ/FAQ";
import HowToBuy from "../Components/HowToBuy/HowToBuy";
import { LayoutWithNavBar, LayoutWithNavBarAndFooter, LayoutWithoutNavBarAndFooter } from "../Components/Layaouts/Layaouts"
import Login from "../Components/Login/Login";
import { AdminContextProvider } from "../Context/AdminContext/adminActions";
import { UserContextProvider } from "../Context/UserContext/userActions"
import ProtectedRoute from "../Utils/ProtectedRoutes";


// Importing all the components here to be more clarity in app component
const routes = [
    {
        path: "/",
        children: [
            {
                path: "/", element:
                    <UserContextProvider>
                        <LayoutWithNavBarAndFooter>
                            <GeneralContainer />
                        </LayoutWithNavBarAndFooter>
                    </UserContextProvider>
            },
            {
                path: "/contact", element:

                    <UserContextProvider>
                        <LayoutWithNavBar>
                            <ContactPage />
                        </LayoutWithNavBar>
                    </UserContextProvider>

            },
            {
                path: "/aboutUs", element:
                    <UserContextProvider>
                        <LayoutWithNavBar>
                            <AboutUs />
                        </LayoutWithNavBar>
                    </UserContextProvider>
            },
            {
                path: "/moreInfo/:id", element:

                    <UserContextProvider>
                        <LayoutWithNavBar>
                            <ProductDetail />
                        </LayoutWithNavBar>
                    </UserContextProvider>
            },
            {
                path: "/cart", element:

                    <UserContextProvider>
                        <LayoutWithNavBar>
                            <BuyCart />
                        </LayoutWithNavBar>
                    </UserContextProvider>
            },
            {
                path: "/howToBuy", element:

                    <UserContextProvider>
                        <LayoutWithNavBar>
                            <HowToBuy />
                        </LayoutWithNavBar>
                    </UserContextProvider>
            },
            {
                path: "/FAQ", element:

                    <UserContextProvider>
                        <LayoutWithNavBarAndFooter>
                            <FAQ />
                        </LayoutWithNavBarAndFooter>
                    </UserContextProvider>
            },
            {
                path: "/login", element:
                    <AdminContextProvider>
                        <LayoutWithoutNavBarAndFooter>
                            <Login />
                        </LayoutWithoutNavBarAndFooter>
                    </AdminContextProvider>
            },
            {
                path: "/casaTomasDash", element:
                    <AdminContextProvider>
                        <UserContextProvider>
                            <LayoutWithoutNavBarAndFooter>
                                <ProtectedRoute element={<DashContainer />} />
                            </LayoutWithoutNavBarAndFooter>
                        </UserContextProvider>
                    </AdminContextProvider>
            },
            {
                path: "*",
                element: <Navigate to="/" replace />
            },
        ],
    },
];

export default function AppRoutes() {
    return useRoutes(routes);
}