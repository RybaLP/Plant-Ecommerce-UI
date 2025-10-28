import { GoogleLogin } from '@react-oauth/google';
import { useAuthenticationStore } from '../store/authenticationStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { apiClient } from '../api/apiclients/apiClient';

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const { setAuthenticated } = useAuthenticationStore();

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const res = await apiClient.post('/login/oauth2/code/google', {
        token: credentialResponse.credential
      });

      localStorage.setItem('jwt', res.data.token);
      setAuthenticated();
      toast.success('Zalogowano pomyślnie');
      navigate('/');
    } catch (err) {
      toast.error('Błąd logowania Google');
    }
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={() => toast.error('Logowanie nie powiodło się')} />;
};

export default GoogleLoginButton;
