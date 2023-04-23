import React, { useEffect } from "react";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message } from "antd";
import { GetAllMovies } from "../../services/movies";
import { useDispatch } from "react-redux";
import { Row, Col } from "antd";

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
            <div className="title-box">
                <h2 className="section-title">My Movies</h2>
            </div>
            <Row gutter={[16, 16]}>
                {movies && movies.map((movie) => (
                    <Col span={24}>
                        <div className="movie-card">
                            <div className="movie-poster-container" >
                                <img className="movie-poster" src={movie.poster} alt="" height={200} width={130} />
                            </div>
                            <div className="movie-info uppercase" >{movie.title}</div>
                        </div>

                    </Col>
                ))}
            </Row>

        </div>


    )
}
export default MyMovies;
