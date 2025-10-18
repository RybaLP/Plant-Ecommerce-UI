import React, { useState } from 'react';
import type { LoginForm } from '../interfaces/loginForm';
import { authenticateUser } from '../api/authenticate';
import { useAuthenticationStore } from '../store/authenticationStore';
import { useNavigate } from 'react-router-dom';
import LoginFormComp from '../components/loginFormComp';
import RegisterComp from '../components/registerComp';

const LoginPage = () => {

  const navigate = useNavigate();

  const [errors, setErrors] = useState<Record<string, string>>({});

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

  return (
    <section className="bg-gray-50 py-12 px-4 md:px-8 font-sans mt-10">
      <div className="container mx-auto max-w-5xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row">
        {/* Lewa kolumna - register */}
        <RegisterComp/>

        {/* right column (login section) */}
        <LoginFormComp formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />

        </div>
    </section>
  );
};

export default LoginPage;