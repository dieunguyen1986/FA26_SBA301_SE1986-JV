import axios from "axios";

 const studentService = {
    create: async (formData) => {
        const response = await axios.post("http://localhost:8080/students", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return response;
    }
}
export default studentService;