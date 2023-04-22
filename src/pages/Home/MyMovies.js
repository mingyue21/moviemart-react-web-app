import React, {useEffect} from "react";
import {HideLoading, ShowLoading} from "../../redux/loadersSlice";
import {message} from "antd";
import {GetAllMovies} from "../../services/movies";
import {useDispatch} from "react-redux";


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
            <h1>My Movies</h1>
        {movies && movies.map((movie) => (
            <div>
                <div>Movie Name: {movie.title}</div>
                <img src={movie.poster} alt={movie.title} height={200} width={130} />
            </div>
        ))}
    </div>
    )
}
export default MyMovies;
