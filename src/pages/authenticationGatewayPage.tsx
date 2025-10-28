import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticationStore } from "../store/authenticationStore";
import type { LoginForm } from "../interfaces/loginForm";
import { authenticateUser } from "../api/authenticate";
import LoginFormComp from "../components/loginFormComp";
import RegisterComp from "../components/registerComp";
import { sendResetPasswordUrl } from "../api/sendResetPasswordUrl";
import toast from "react-hot-toast";


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

            <div className="text-xl text-center space-y-5">
              <h1 className="font-bold mt-10">Zakupy bez konta </h1>
              <span>Kup jako gość bez zakładania konta</span>
              <button className="hover:cursor-pointer p-2 bg-orange-500 rounded-full text-white font-bold"
              onClick={()=>navigate("/koszyk/adres")}>Kontynuuj bez logowania</button>
            </div>

          </div>
        </section>
  )
}

export default AuthenticationGatewayPage;