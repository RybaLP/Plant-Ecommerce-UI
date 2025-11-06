import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticationStore } from "../store/authenticationStore";
import type { LoginForm } from "../interfaces/loginForm";
import { authenticateUser } from "../api/authenticate";
import LoginFormComp from "../components/loginFormComp";
import RegisterComp from "../components/registerComp";
import { sendResetPasswordUrl } from "../api/sendResetPasswordUrl";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa";


const AuthenticationGatewayPage = () => {

  const navigate = useNavigate();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emailToResetPassword,setEmailToResetPassword] = useState("");
  const [isForgotPasswordOpen,setIsForgotPasswordOpen] = useState(false);

  const setAuthenticated = useAuthenticationStore((state)=>state.setAuthenticated);

  const [formData , setFormData] = useState<LoginForm>({
      email : '',
      password : ''
  });

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
      const {name , value} = e.target;
      setFormData({...formData , [name] : value});
  }

  const validate = () => {
    let newErrors: Record<string, string> = {};
    if(!formData.email) newErrors.email = "Email musi byc podany"
    if(!formData.password) newErrors.password = "Haslo musi byc podane"

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e : React.FormEvent) => {

     e.preventDefault();
     if(!validate()) return;

     try {
        const success = await authenticateUser(formData);
        if(success) {
          setAuthenticated();
          navigate("/");
        } else {
          alert("Błędne dane logowania");
        }
     } catch (error) {
        alert("Wystąpił problem. Spróbuj ponownie");
     }
  }

  const handleSendEmail = async (e : React.FormEvent) => {
    
    e.preventDefault();

    try {
        const response = await sendResetPasswordUrl(emailToResetPassword);
        if (response >= 200 && response < 300) {
          
            toast.success("Wysłano na pocztę link do zmiany hasła");
        }
    } catch (error: any) {
        toast.error(error.message || "Nie udało się wysłać linku resetującego hasło");
    }
 }
  
    return (
        <section className="bg-gray-50 py-12 px-4 md:px-8 font-sans mt-10">
          <div className="container mx-auto max-w-5xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row">
            <LoginFormComp formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} isForgotPasswordOpen={isForgotPasswordOpen} handleSendEmail={handleSendEmail} setIsForgotPasswordOpen={setIsForgotPasswordOpen} emailToResetPassword={emailToResetPassword} setEmailToResetPassword={setEmailToResetPassword}/>
            <RegisterComp/>

              <div className="flex-1 bg-gradient-to-br from-orange-50 to-amber-50 p-8 flex flex-col justify-center items-center text-center border-l border-gray-200">
          <div className="mb-6">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUserClock className="text-white text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Zakupy bez konta</h2>
            <p className="text-gray-600 mb-6 max-w-xs mx-auto">
              Kup jako gość bez zakładania konta. Szybko i wygodnie!
            </p>
          </div>

          <button 
            onClick={() => navigate("/koszyk/adres")}
            className="group bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3"
          >
            <span>Kontynuuj bez logowania</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <div className="mt-6 text-sm text-gray-500 space-y-1">
            <p>• Szybkie zamówienie</p>
            <p>• Bez zakładania konta</p>
            <p>• Możliwość rejestracji później</p>
          </div>
        </div>

          </div>
        </section>
  )
}

export default AuthenticationGatewayPage;