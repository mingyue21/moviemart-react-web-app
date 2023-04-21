import { axiosInstance } from ".";

// user book mark a movie
export const userBookmarkMovie = async (userId, movieId, payload) => {
    const response = await axiosInstance.post(`/api/bookmarks/${userId}/${movieId}`, payload);
    return response.data;
};

// check if user has bookmarked a movie
export const checkUserBookmarkMovie = async (userId, movieId) => {
    const response = await axiosInstance.get(`/api/bookmarks/get-user-bookmarked/${userId}/${movieId}`);
    return response.data;
}

// get all bookmarked movies
export const getAllBookmarkedMovies = async () => {
    const response = await axiosInstance.get(`/api/bookmarks/all`);
    return response.data;
}

// get all bookmarked movies by user
export const getAllBookmarkedMoviesByUser = async (userId) => {
    const response = await axiosInstance.get(`/api/bookmarks/get-bookmarks-by-user/${userId}`);
    return response.data;
}

// get all bookmarked users by movie
export const getAllBookmarkUser = async (movieId) => {
    const response = await axiosInstance.get(`/api/bookmarks/get-users-by-movie/${movieId}`);
    return response.data.data;
}