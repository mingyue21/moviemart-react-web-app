import { axiosInstance } from ".";

// add show
export const AddShow = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/shows",payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
};

// get show by id
export const GetShowById = async (showId) => {
    try {
        const response = await axiosInstance.get(`/api/shows/${showId}`);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

// get all shows by theatre
export const GetAllShowsByTheatre = async (theatreId) => {
    try {
        const response = await axiosInstance.get(`/api/shows/get-shows-by-theatre/${theatreId}`);
        return response.data;
    } catch (error) {
        return error.response;
    }
};

// delete show
export const DeleteShow = async (showId) => {
    try {
        const response = await axiosInstance.delete(`/api/shows/${showId}`);
        return response.data;
    } catch (error) {
        return error.response;
    }
};