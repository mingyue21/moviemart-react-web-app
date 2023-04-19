import { axiosInstance } from ".";

// Add a new theatre
export const AddTheatre = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/theatres", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
};

// get all theatres
export const GetAllTheatres = async () => {
    try {
        const response = await axiosInstance.get("/api/theatres");
        return response.data;
    } catch (error) {
        return error.response;
    }
};

// update theatre
export const UpdateTheatre = async (theatreId, payload) => {
    try {
        const response = await axiosInstance.put(`api/theatres/${theatreId}`, payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
};

// delete theatre
export const DeleteTheatre = async (theatreId) => {
    try {
        const response = await axiosInstance.delete(`/api/theatres/${theatreId}`);
        return response.data;
    } catch (error) {
        return error.response;
    }
};

// get all theatres by owner
export const GetAllTheatresByOwner = async (ownerId) => {
    try {
        const response = await axiosInstance.get(`/api/theatres/get-all-theatres-by-owner/${ownerId}`);
        return response.data;
    } catch (error) {
        return error.response;
    }
};

// get all theatres for a movie
export const GetAllTheatresByMovie = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/theatres/get-all-theatres-by-movie", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
};