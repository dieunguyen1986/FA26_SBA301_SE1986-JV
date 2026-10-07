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
    const response = await axiosClient.get("http://localhost:3000/users");
    const matchedUser = response.data.find(
      (user) =>
        user.email === credential.email &&
        user.password === credential.password,
    );

    if (!matchedUser) {
      throw new Error("Credential is wrong!");
    }

    return {
      data: {
        ...matchedUser,
        roles: Array.isArray(matchedUser.roles) ? matchedUser.roles : [],
        authToken: matchedUser.authToken || matchedUser.token,
      },
    };
  },
};
