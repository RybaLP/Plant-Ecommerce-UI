import React, { useState, type FormEvent } from 'react';
import type { LoginForm } from '../interfaces/loginForm';
import { authenticateUser } from '../api/authenticate';
import { useAuthenticationStore } from '../store/authenticationStore';
import { useNavigate } from 'react-router-dom';
import LoginFormComp from '../components/loginFormComp';
import RegisterComp from '../components/registerComp';
import toast from 'react-hot-toast';
import { sendResetPasswordUrl } from '../api/sendResetPasswordUrl';

const LoginPage = () => {
  const navigate = useNavigate();
  
  const [emailToResetPassword,setEmailToResetPassword] = useState("");
  const [isForgotPasswordOpen,setIsForgotPasswordOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData , setFormData] = useState<LoginForm>({
      email : '',
      password : ''
  });

  const setAuthenticated = useAuthenticationStore((state)=>state.setAuthenticated);

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
      const {name , value} = e.target;
      setFormData({...formData , [name] : value});
  }

  const handleSendEmail = async (e : FormEvent) => {
    
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
          toast.success("Pomyślnie zalogowano!");
        } else {
          alert("Błędne dane logowania");
        }
     } catch (error) {
        alert("Wystąpił problem. Spróbuj ponownie");
     }
  }

  return (
    <section className="bg-gray-50 py-12 px-4 md:px-8 font-sans mt-10">
      <div className="container mx-auto max-w-5xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row">
        {/* Lewa kolumna - register */}
        <RegisterComp/>

        {/* right column (login section) */}
        <LoginFormComp formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}  
        isForgotPasswordOpen={isForgotPasswordOpen} setIsForgotPasswordOpen={setIsForgotPasswordOpen}
        emailToResetPassword={emailToResetPassword} setEmailToResetPassword={setEmailToResetPassword}
        handleSendEmail={handleSendEmail} />
        </div>
    </section>
  );
};

export default LoginPage;