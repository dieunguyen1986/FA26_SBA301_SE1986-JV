import APPLICANTS_DATA from "../../../data/applicant";

export const candidateApi = {
  findAll: async () => {
    return { data: APPLICANTS_DATA };
  },

  findAllStatus: async () => {
    return { data: ["Pending", "Interview", "Hired"] };
  },
};
