import React from "react";
import { Link } from 'react-router-dom';
import { getAllBookmarkedMovies } from "../../services/bookmarks";
import { useState } from "react";
import { Row, Col } from 'antd';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message } from "antd";


function Home() {
    const [movies, setMovies] = React.useState([]);
    const dispatch = useDispatch();
    const getData = async () => {
      try {
        dispatch(ShowLoading());
        const response = await getAllBookmarkedMovies();
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
            <div>
                <Link to="/search">
                    Search
                </Link>
            </div>

            <h2>Bookmarked Movies</h2>
            <Row gutter={[30]} className="mt-2">
                {movies && movies.map((movie) => (
                    <Col span={6}>
                        <Link to={`/detail/${movie.movieId}`}>
                            <div className="card flex flex-col gap-1 cursor-pointer" >
                                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" height={200} width={130} />
                                <div className="flex justify-center p-1">
                                    <h1 className="text-md uppercase">{movie.name}</h1>
                                    <h1 className="text-md">Bookmarked {movie.bookmarksCount}</h1>
                                </div>
                            </div>
                        </Link>
                    </Col>
                ))}
            </Row>
            
        </div>
    )
}

export default Home;