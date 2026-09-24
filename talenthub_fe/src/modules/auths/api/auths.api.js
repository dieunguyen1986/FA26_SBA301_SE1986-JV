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
    // fetch
    console.log(`Auth Appi: ${payload.fullName}`);

    return { message: "Register successful!" };
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
