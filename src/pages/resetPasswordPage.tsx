import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/resetPassword";
import type { ResetPasswordRequest } from "../interfaces/requests/resetPasswordRequest";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== repeatPassword) {
      toast.error("Hasła nie są takie same");
      return;
    }

    if (!token) {
      toast.error("Brak tokena resetującego");
      return;
    }

    setIsLoading(true);
  try {
    const reqBody: ResetPasswordRequest = { newPassword, token };
    await resetPassword(reqBody);
    toast.success("Hasło zostało zmienione! 🎉");
    setTimeout(() => navigate("/login"), 1500);
  } catch {
    toast.error("Coś poszło nie tak. Spróbuj ponownie.");
  } finally {
    setIsLoading(false);
  }

   
  };

  return (
    <section className="flex justify-center items-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Zresetuj hasło
        </h2>

        <p>Jeśli na ten e-mail jest założone konto, to wyślemy na niego wiadomość.</p>

        <div className="space-y-4 mt-4">
          <div>
            <label htmlFor="newPassword" className="sr-only">
              Nowe hasło
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nowe hasło"
              className="w-full border-b border-gray-400 py-2 focus:outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label htmlFor="repeatPassword" className="sr-only">
              Powtórz hasło
            </label>
            <input
              id="repeatPassword"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              placeholder="Powtórz hasło"
              className="w-full border-b border-gray-400 py-2 focus:outline-none focus:border-green-600"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 text-white font-bold py-3 rounded-full hover:bg-orange-600 transition-colors mt-6"
          >
            Potwierdź zmianę hasła
          </button>
        </div>
      </form>
    </section>
  );
};

export default ResetPasswordPage;
