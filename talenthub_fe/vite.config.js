import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://fa26-sba301-se1986-jv.onrender.com",
        changeOrigin: true,
        secure: true,
        // The Render backend sets Secure + SameSite=None for HTTPS production.
        // The local Vite server is HTTP, so rewrite only the proxied dev
        // response cookie for localhost. Production builds do not use this.
        configure: (proxy) => {
          proxy.on("proxyRes", (proxyRes) => {
            const setCookie = proxyRes.headers["set-cookie"];

            if (setCookie) {
              const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];
              proxyRes.headers["set-cookie"] = cookies.map((cookie) =>
                cookie
                  .replace(/;\s*Secure/gi, "")
                  .replace(/SameSite=None/gi, "SameSite=Lax"),
              );
            }
          });
        },
      },
    },
  },
});
