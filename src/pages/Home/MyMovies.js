import React, { useEffect } from "react";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message } from "antd";
import { GetAllMovies } from "../../services/movies";
import { useDispatch } from "react-redux";


function MyMovies() {
    const [movies, setMovies] = React.useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetAllMovies();
            if (response.success) {
                setMovies(response.data);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    useEffect(() => {
        getData();
    }, []);


    return (
        <div>
            <h2 className="section-title">My Movies</h2>
            {movies && movies.map((movie) => (
                <div className="movie-card">
                    <div className="movie-poster-container">
                        <img className="movie-poster" src={movie.poster} alt={movie.title} height={200} width={130} />
                    </div>
                    <div className="movie-info uppercase" style={{ marginLeft: '20px' }}>{movie.title}</div>
                </div>
            ))}
        </div>


    )
}
export default MyMovies;
