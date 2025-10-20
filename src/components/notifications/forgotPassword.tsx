import type { FormEvent, SetStateAction } from "react";
import { IoMdCloseCircle } from "react-icons/io";

interface Props {
  setIsForgotPasswordOpen: React.Dispatch<SetStateAction<boolean>>;
  handleSendEmail : (e : FormEvent) => void | Promise<void>;
  emailToResetPassword : string;
  setEmailToResetPassword : React.Dispatch<SetStateAction<string>>;
}

const ForgotPassword = ({ setIsForgotPasswordOpen,
    handleSendEmail, emailToResetPassword , setEmailToResetPassword}: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full text-center">
        
        <span
          onClick={() => setIsForgotPasswordOpen(false)}
          className="absolute -top-4 -right-4 cursor-pointer z-50 bg-white rounded-full"
        >
          <IoMdCloseCircle size={30} color="red" />
        </span>

        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Zapomniałeś hasła?
        </h1>

        <p className="text-gray-600 mb-6">
          Podaj email, a system wyśle link do zmiany hasła na twoją pocztę elektroniczną.
        </p>

        <form onSubmit={(e)=>handleSendEmail(e)}>
          <input
            type="email"
            placeholder="przykladowy-email@gmail.com"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
            value={emailToResetPassword}
            onChange={(e) => {setEmailToResetPassword(e.target.value)}}
            required
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full" type="submit">
            Wyślij
          </button>
        </form>
      </div>
    </div>
  );
};
export default ForgotPassword;