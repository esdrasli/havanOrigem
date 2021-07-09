import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/auth";

export const SignIn: React.FC = () => {
  const query = new URLSearchParams(useLocation().search);
  const { signIn } = useAuth();

  const token = query.get("access_token");

  if (!token) {
    const webUrl = process.env.REACT_APP_WEB;
    window.location.href = `https://sistema.havan.com.br/AutenticacaoApi/Entrar?ReturnUrl=${webUrl}/&RedirectUrl=${webUrl}/dashboard`;
    return null;
  }

  signIn(token);
  window.location.href = "/dashboard";
  return null;
};
