import { axiosClient } from "../../../shared/api/axiosClient";

let users = [
  {
    email: "hieu@gmail.com",
    password: "123",
    fullName: "Nguyen Van Hieu",
    roles: ["CANDIDATE"],
    token: crypto.randomUUID(),
  },
  {
    email: "hoa@gmail.com",
    password: "123",
    fullName: "Nguyen Thi Hoa",
    roles: ["ADMIN"],
    token: crypto.randomUUID(),
  },
];

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
    const response = await axiosClient.get("/users");
    const user = response.data.find(
      (user) =>
        user.email === credential.email &&
        user.password === credential.password,
    );

    if (!user) {
      throw new Error("Credential is wrong!");
    }

    return {
      data: user,
    };
  },
};
