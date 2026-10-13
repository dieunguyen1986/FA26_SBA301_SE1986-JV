import { axiosClient } from "../../../shared/api/axiosClient";

export const departmentApi = {
    getAllDepartments: async () => {
        const response = await axiosClient.get(`/api/v1/departments`);
        return response;
    }
}