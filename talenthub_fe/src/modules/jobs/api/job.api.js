import { axiosClient } from "../../../shared/api/axiosClient";

export const jobApi = {
    getJobs: async ({index = 0, size = 2}) => {
        const response = await axiosClient.get(`/api/v1/jobs?index=${index}&size=${size}`);
        return response;
    }
}

