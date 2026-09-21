export const authsApi = {
  register: async(payload) => {
    
    // fetch
    console.log(`Auth Appi: ${payload.fullName}`);

    return {message: "Register successful!"};
  },
  login: ()=>{

  }
};


