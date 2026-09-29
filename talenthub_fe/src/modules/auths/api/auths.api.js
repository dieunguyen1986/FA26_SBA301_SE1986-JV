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
    return {
      data: users.find((user) => {
        if (
          user.email === credential.email &&
          user.password === credential.password
        )
          return user;
      }),
    };
  },
};
