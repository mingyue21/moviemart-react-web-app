import React from "react";
import { Link } from 'react-router-dom';
import { getAllBookmarkedMovies } from "../../services/bookmarks";
import { useState } from "react";
import { Row, Col, Button } from 'antd';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message } from "antd";
import { useSelector } from "react-redux";
import MyMovies from "./MyMovies";
import MyBookings from "./MyBookings";
import MyTheaters from "./MyTheaters";


function Home() {
    const { user } = useSelector((state) => state.users);
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
                    <Button size="large" className="btn btn-primary mb-1 text-xl bg-secondary">
                        <span className="pb-1">Search Movies</span>
                    </Button>
                </Link>
            </div>

            <Row gutter={[50, 10]} className="mt-2">
                <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                    <div className="title-box">
                        <h2 className="section-title">Bookmarked Movies</h2>
                    </div>
                    <Row gutter={[30, 30]}>
                        {movies && movies.map((movie) => (
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Link to={`/detail/${movie.movieId}`}>

                                    <div className="card flex flex-col gap-1 cursor-pointer position-rel">
                                        <div>
                                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" height={200} width={130} style={{ margin: 0, borderRadius: '5px 5px 5px 5px' }} />
                                        </div>

                                        <div style={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"
                                        }}>
                                            <h1 className="justify-center p-1 text-md uppercase">{movie.name}</h1>
                                            <h1 className="text-md absolute bottom-right">
                                                <i className="ri-bookmark-line text-secondary mr-5px" />
                                                <span className="text-secondary mr-5px">{movie.bookmarksCount}</span>
                                            </h1>
                                        </div>
                                    </div>

                                </Link>
                            </Col>
                        ))}
                    </Row>
                </Col>

                <Col xs={0} sm={0} md={0} lg={8} xl={8}>
                    {user && user.isAdmin && (
                        <div>
                            <MyMovies />
                        </div>
                    )}

                    {user && user.isOwner && (
                        <div>
                            <MyTheaters />
                        </div>
                    )}

                    {user && user.isUser && (
                        <div>
                            <MyBookings />
                        </div>
                    )}

                    {!user && (
                        <div className="title-box">
                            <h2 className="section-title">Login to see more...</h2>
                        </div>
                    )}
                </Col>
            </Row>
        </div>



    )
}

export default Home;