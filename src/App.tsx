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

function App() {

  // initial FETCH of all plants
  useAllPlants();

  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/rejestracja" element={<RegisterPage/>} />
          <Route path="/koszyk" element={<CartPage/>} />
          <Route path="/produkt/:id" element={<ProductPage/>} />
          <Route path="/koszyk/konto" element={<AuthenticationGatewayPage/>}/>
          <Route path="/koszyk/adres" element={<GuestOrderPage/>} />
          <Route path="/koszyk/zamowienie" element={<OrderPage/>} />
        </Routes>

        <Toaster 
          position="bottom-center"
          reverseOrder={false}
        />

      </main>
      <Footer />
    </div>
    </>
  )
}

export default App
