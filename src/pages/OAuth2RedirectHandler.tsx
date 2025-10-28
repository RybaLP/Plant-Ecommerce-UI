import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthenticationStore } from "../store/authenticationStore";

export default function OAuth2RedirectHandler() {
  const { setAuthenticated } = useAuthenticationStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const refreshToken = searchParams.get("refreshToken");
    const error = searchParams.get("error");

    if (error) {
      console.error("OAuth error:", error);
      navigate("/login?error=" + error);
      return;
    }

    if (token) {
      localStorage.setItem("jwtToken", token);
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
      setAuthenticated();
      navigate("/");
    } else {
      navigate("/login?error=no_token");
    }
  }, [navigate, searchParams, setAuthenticated]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Trwa logowanie...</p>
      </div>
    </div>
  );
}