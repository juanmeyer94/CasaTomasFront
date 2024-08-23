import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GeneralContainer from "./Components/Containers/generalContainer";
import { LayoutWithNavBarAndFooter, LayoutWithoutNavBarAndFooter, LayoutWithNavBar } from './Components/Layaouts/Layaouts';
import AboutUs from './Components/AboutUs/aboutUs';
import ContactPage from './Components/Contact/Contact';
import ProductDetail from './Components/Card/moreInfoCard';
import useKeepAlive from './Utils/keepAlive';
import BuyCart from './Components/Cart/buyCart';
import HowToBuy from './Components/HowToBuy/HowToBuy';
import FAQ from './Components/FAQ/FAQ';
import Login from './Components/Login/Login';
import { UserContextProvider } from './Context/UserContext/userActions';
import DashContainer from './Components/Dashboard/dashboardContainer';
import ProtectedRoute from './Utils/ProtectedRoutes';
import { AdminContextProvider } from './Context/AdminContext/adminActions';


function App() {
  useKeepAlive('https://casa-tomas-api.onrender.com/api/health');

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <UserContextProvider>
              <LayoutWithNavBarAndFooter>
                <GeneralContainer />
              </LayoutWithNavBarAndFooter>
            </UserContextProvider>
          }
        />
        <Route
          path="/contact"
          element={
            <UserContextProvider>
              <LayoutWithNavBar>
                <ContactPage />
              </LayoutWithNavBar>
            </UserContextProvider>
          }
        />
        <Route
          path="/aboutUs"
          element={
            <UserContextProvider>
              <LayoutWithNavBar>
                <AboutUs />
              </LayoutWithNavBar>
            </UserContextProvider>
          }
        />
        <Route
          path="/moreInfo/:id"
          element={
            <UserContextProvider>
              <LayoutWithNavBarAndFooter>
                <ProductDetail />
              </LayoutWithNavBarAndFooter>
            </UserContextProvider>
          }
        />
        <Route
          path="/cart"
          element={
            <UserContextProvider>
              <LayoutWithNavBar>
                <BuyCart />
              </LayoutWithNavBar>
            </UserContextProvider>
          }
        />
        <Route
          path='/howToBuy'
          element={
            <UserContextProvider>
              <LayoutWithNavBar>
                <HowToBuy />
              </LayoutWithNavBar>
            </UserContextProvider>
          }
        />
        <Route
          path="/FAQ"
          element={
            <UserContextProvider>
              <LayoutWithNavBarAndFooter>
                <FAQ />
              </LayoutWithNavBarAndFooter>
            </UserContextProvider>
          }
        />
        <Route
          path='/login'
          element={
            <AdminContextProvider>
            <LayoutWithoutNavBarAndFooter>
              <Login />
            </LayoutWithoutNavBarAndFooter>
            </AdminContextProvider>
          }
        />
        <Route path='/casaTomasDash' element={
          <AdminContextProvider>   
          <UserContextProvider>

          <LayoutWithoutNavBarAndFooter>
           <ProtectedRoute element={<DashContainer />} />
          </LayoutWithoutNavBarAndFooter>
          </UserContextProvider>
          </AdminContextProvider>
        } />
        
          <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
      </Routes>
    </Router>
  );
}

export default App;
