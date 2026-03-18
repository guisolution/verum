// Forçamos um valor padrão caso o .env falhe
export const OAUTH_SERVER_URL = import.meta.env.VITE_OAUTH_SERVER_URL || "http://localhost:3000";

export const COOKIE_NAME = "verum_session";

export const getLoginUrl = () => {
  try {
    const url = new URL("/auth/login", OAUTH_SERVER_URL);
    return url.toString();
  } catch (e) {
    // Se tudo falhar, retorna o link manual para não quebrar a tela
    return "http://localhost:3000/auth/login";
  }
};