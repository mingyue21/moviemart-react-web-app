import { axiosInstance } from ".";

// get bookings of a user
export const GetBookingsOfUser = async (userId) => {
    try {
        const response = await axiosInstance.get(`/api/bookings/${userId}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// make payment
export const MakePayment = async (token, amount) => {
    try {
        const response = await axiosInstance.post("/api/bookings/make-payment", {
            token,
            amount,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// book shows
export const BookShowTickets = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/bookings/book-show", payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};