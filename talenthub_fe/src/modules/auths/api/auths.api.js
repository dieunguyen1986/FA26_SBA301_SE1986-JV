import { axiosClient } from "../../../shared/api/axiosClient";

export const authsApi = {
  register: async (payload) => {
    console.log(`Auth Appi: ${payload.fullName}`);

    // fetch
    return fetch("http://localhost:3000/candidates", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  login: async (credential) => {
    console.log(`Auth Appi: ${credential.email} - ${credential.password}`);

    const response = await axiosClient.post("/api/v1/auths/login", credential);
    return response;
  },
};
