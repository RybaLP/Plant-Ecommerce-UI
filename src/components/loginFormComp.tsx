import React, { type FormEvent, type SetStateAction } from 'react'
import type { LoginForm } from '../interfaces/loginForm'
import { FaFacebook , FaGoogle} from 'react-icons/fa'
import ForgotPassword from './notifications/forgotPassword';

interface Props {
    handleSubmit : (e : React.FormEvent) => void,
    handleChange : (e : React.ChangeEvent<HTMLInputElement>) => void,
    formData : LoginForm,
    isForgotPasswordOpen : boolean,
    setIsForgotPasswordOpen : React.Dispatch<SetStateAction<boolean>>;
    handleSendEmail : (e : FormEvent) => void | Promise<void>;
    emailToResetPassword : string;
    setEmailToResetPassword : React.Dispatch<SetStateAction<string>>;
}

const LoginFormComp = ({handleSubmit, handleChange, formData, isForgotPasswordOpen, setIsForgotPasswordOpen,
   handleSendEmail, emailToResetPassword, setEmailToResetPassword} : Props) => {
  
  return (
    <div className="md:w-1/2 p-8 flex flex-col items-center md:items-start">
          <h2 className="text-xl font-bold text-gray-800 mb-6">ZALOGUJ SIĘ</h2>

          <div className="w-full space-y-4 mb-6">
            <button className="flex items-center justify-center w-full bg-white text-gray-700 border border-gray-300 py-3 rounded-md hover:bg-gray-100 transition-colors">
              <FaFacebook size={24} className="mr-4 text-blue-600" aria-hidden="true" />
              <span>FACEBOOK</span>
            </button>
            <button className="flex items-center justify-center w-full bg-white text-gray-700 border border-gray-300 py-3 rounded-md hover:bg-gray-100 transition-colors">
              <FaGoogle size={24} className="mr-4" aria-hidden="true" />
              <span>GOOGLE</span>
            </button>
          </div>

          <p className="text-gray-500 mb-4">Lub</p>

          <form className="w-full space-y-4">
            <div className="relative">
              <label htmlFor="email" className="sr-only">E-mail</label>
              <input
                type="email"
                id="email"
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder="E-mail"
                className="w-full border-b border-gray-400 py-2 focus:outline-none focus:border-green-600"
                aria-label="E-mail"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="sr-only">Hasło</label>
              <input
                type="password"
                name='password'
                value={formData.password}
                onChange={handleChange}
                id="password"
                placeholder="Hasło"
                className="w-full border-b border-gray-400 py-2 focus:outline-none focus:border-green-600"
                aria-label="Hasło"
              />
              <button type="button" className="absolute right-0 top-2 text-sm text-gray-500 hover:text-gray-700">
                POKAŻ HASŁO
              </button>
            </div>
            <a className="text-sm text-gray-500 block text-right hover:underline hover:cursor-pointer" onClick={()=>setIsForgotPasswordOpen(true)}>
              Nie pamiętam hasła
            </a>
            
            <button type="submit" onClick={handleSubmit} className="w-full bg-orange-500 text-white font-bold py-3 rounded-full hover:bg-orange-600 transition-colors">
              ZALOGUJ SIĘ
            </button>
          </form>

          {isForgotPasswordOpen && <ForgotPassword setIsForgotPasswordOpen={setIsForgotPasswordOpen} emailToResetPassword={emailToResetPassword} setEmailToResetPassword={setEmailToResetPassword} 
          handleSendEmail={handleSendEmail} />}
        </div>
  )
}

export default LoginFormComp;