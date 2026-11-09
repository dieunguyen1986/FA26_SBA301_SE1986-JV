import axios from "axios";

export const axiosClient = axios.create({
  // Local development uses Vite's same-origin /api proxy so Safari can keep
  // the HttpOnly cookie. Production can override this with VITE_API_BASE_URL.
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.DEV ? "" : "https://fa26-sba301-se1986-jv.onrender.com"),
  timeout: 60000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
