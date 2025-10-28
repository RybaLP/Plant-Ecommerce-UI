import LandingPage from "./pages/landingPage"
import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/loginPage"
import Navbar from "./components/Navbar/navbar"
import Footer from "./components/footer"
import RegisterPage from "./pages/registerPage"
import CartPage from "./pages/cartPage"
import ProductPage from "./pages/productPage"
import { Toaster } from "react-hot-toast"
import OrderPage from "./pages/orderPage"
import AuthenticationGatewayPage from "./pages/authenticationGatewayPage"
import GuestOrderPage from "./pages/guestOrderPage"
import { useAllPlants } from "./hooks/useAllPlants"
import ResetPasswordPage from "./pages/resetPasswordPage"
import NotFoundPage from "./pages/notFoundPage"
import OrderConfirmationPage from "./pages/orderConfirmationPage"
import ClientOrdersPage from "./pages/clientOrdersPage"
import ClientOpinionsPage from "./pages/clientOpinionPages"
import NotReviewedItemsPage from "./pages/notReviewedItemsPage"
import AddressPage from "./pages/addressPage"
import FruitPlantsPage from "./pages/fruitPlantsPage"
import DeciduousPlantsPage from "./pages/deciduousPlantsPage"
import OAuth2RedirectHandler from "./pages/OAuth2RedirectHandler"
import ConiferousPage from "./pages/coniferousPage"
import OrnamentalPlantsPage from "./pages/ornamentalPlantsPage"
import AdminLoginPage from "./pages/adminLoginPage"
import { useLocation } from "react-router-dom"
import AdminPanelPage from "./pages/adminPanelPage"

function App() {

   const location = useLocation();
   const hideLayout = location.pathname.startsWith("/super/secret/admin");

  // initial FETCH of all plants
  useAllPlants();


  return (
    <>
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/rejestracja" element={<RegisterPage/>} />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler/>} />

          <Route path="/koszyk" element={<CartPage/>} />
          <Route path="/produkt/:id" element={<ProductPage/>} />
          <Route path="/koszyk/konto" element={<AuthenticationGatewayPage/>}/>
          <Route path="/koszyk/adres" element={<GuestOrderPage/>} />
          <Route path="/koszyk/zamowienie" element={<OrderPage/>} />
          <Route path="/resetowanie-hasla" element={<ResetPasswordPage/>} />
          <Route path="/zamowienie" element={<OrderConfirmationPage/>} />
          <Route path="/uzytkownik/zamowienia" element={<ClientOrdersPage/>} />
          <Route path="/uzytkownik/opinie" element={<ClientOpinionsPage/>} />
          <Route path="/uzytkownik/opinie/nie-zrecenzowane" element={<NotReviewedItemsPage/>} />
          <Route path="/uzytkownik/adres" element={<AddressPage/>} />
           
          <Route path="*" element={<NotFoundPage/>} />

          {/* plant pages routes */}
          <Route path="/rosliny/owocowe" element={<FruitPlantsPage/>} />
          <Route path="/rosliny/lisciaste" element={<DeciduousPlantsPage/>} />
          <Route path="/rosliny/iglaste" element={<ConiferousPage />} />
          <Route path="/rosliny/ozdobne" element={<OrnamentalPlantsPage/>} />

          {/* admin */}
          <Route path="/super/secret/admin/login" element={<AdminLoginPage/>} /> 
          <Route path="/super/secret/admin/panel" element={<AdminPanelPage/>} /> 

        </Routes>

        <Toaster 
          position="bottom-center"
          reverseOrder={false}
        />

      </main>
      {!hideLayout && <Footer />}
    </div>
    </>
  )
}

export default App
