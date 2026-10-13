import { axiosClient } from "../../../shared/api/axiosClient";

export const jobApi = {
  getJobs: async ({ index = 0, size = 2, filters={}}) => {
    console.log("Search parameters in API:", filters.title, filters.departmentId, filters.recruitmentMonth, filters.recruitmentYear);

    const response = await axiosClient.get(`/api/v1/jobs`, {
      params: {
        index,
        size,
        departmentId: filters.departmentId,
        title: filters.title,
        recruitmentMonth: filters.recruitmentMonth,
        recruitmentYear: filters.recruitmentYear,
      },
    });

    return response;
  },
};
