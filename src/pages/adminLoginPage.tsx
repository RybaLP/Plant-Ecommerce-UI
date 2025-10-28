import { useState } from "react";
import type { LoginForm } from "../interfaces/loginForm";
import { useLoginAdmin } from "../hooks/useLoginAdmin";
import { authenticateAdmin } from "../api/authenticateAdmin";
import { useNavigate } from "react-router-dom";
import { useAdminAuthStore } from "../store/adminAuthState";

const AdminLoginPage = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [token, setToken] = useState("");
  const [step, setStep] = useState<"login" | "twoFactor">("login");
  const [error, setError] = useState("");

  const { mutate: loginMutate } = useLoginAdmin();

  const {setIsAuthenticated} = useAdminAuthStore();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    loginMutate(formData, {
      onSuccess: (res) => {
        if (res === true) {
          setStep("twoFactor"); 
        } else {
          setError("Niepoprawny email lub hasło");
        }
      },
      onError: () => setError("Błąd logowania"),
    });
  };

  const handleTwoFactorSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const jwt = await authenticateAdmin(token);
      localStorage.setItem("jwtToken", jwt.token);
      alert("Zalogowano pomyślnie!");
      setIsAuthenticated();
      navigate("/super/secret/admin/panel");
    } catch (err: any) {
      setError(err?.message || "Niepoprawny kod");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {step === "login" && (
        <form
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
          onSubmit={handleLoginSubmit}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Podaj swój email"
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            required
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Hasło
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Podaj hasło"
            onChange={handleChange}
            className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors font-medium"
          >
            Zaloguj się
          </button>
        </form>
      )}

      {step === "twoFactor" && (
        <form
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
          onSubmit={handleTwoFactorSubmit}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Wpisz kod z maila</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <input
            type="text"
            name="twoFactorCode"
            value={token}
            placeholder="Kod z maila"
            onChange={(e) => setToken(e.target.value)}
            className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors font-medium"
          >
            Potwierdź kod
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminLoginPage;