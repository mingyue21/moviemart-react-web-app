const {axiosInstance} = require(".");

//Register a new user
export const RegisterUser = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/users/register", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
};

//login a  user
export const LoginUser = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/users/login", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
};

//Get current user
export const GetCurrentUser = async () => {
    try {
        const response = await axiosInstance.get("/api/users/get-current-user");
        return response.data;
    } catch (error) {
        return error;
    }
};

//Update personal information
export const UpdatePersonalInfo = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/users/update-personal-info", payload);
        return response.data;
    } catch (error) {
        return error;
    }
}

// //  if the email already exists
// export const checkEmail = async (payload) => {
//     try {
//         const response = await axiosInstance.post("/api/users/update-personal-info", payload);
//         return response.data;
//     } catch (error) {
//         return error;
//     }
// }

// get user by id
export const GetUserById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/users/get-user-by-id/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
}