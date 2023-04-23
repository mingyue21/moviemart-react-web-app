import React from "react";
import { Tabs } from "antd";
import { GetUserById } from "../../services/users";
import { useState, useEffect } from "react";
import { Input } from "antd";
import { useParams } from "react-router-dom";
import { Row, Col } from 'antd';
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message } from "antd";
import { Link } from "react-router-dom";
import { getAllBookmarkedMoviesByUser } from "../../services/bookmarks";

function OtherProfile() {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const fetchUser = async () => {
        const response = await GetUserById(id);
        setUser(response.data);
    };

    const [movies = [], setMovies] = React.useState([]);
    const dispatch = useDispatch();
    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await getAllBookmarkedMoviesByUser(id);
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
        fetchUser();
        getData();
    }, []);
    return (
        <div>
            {user &&
                <Tabs defaultActiveKey="1">
                    {/* personal information */}
                    <Tabs.TabPane tab="Personal Information" key="2">
                        <form className="pb-2" >

                            <label htmlFor="name">Name:</label>
                            <Input value={user.name} />

                            <label htmlFor="email">Email:</label>
                            <Input value={user.email} />

                        </form>
                    </Tabs.TabPane>

                    {/* bookmarks */}
                    <Tabs.TabPane tab="Bookmarks" key="3">
                        <Row gutter={[30, 30]} className="mt-2">
                            {movies && movies.map((movie) => (
                                <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                                    <Link to={`/detail/${movie.movieId}`}>
                                        <div className="card flex flex-col gap-1 cursor-pointer position-rel" >
                                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" height={200} width={130} style={{ margin: 0, borderRadius: '5px 5px 5px 5px' }} />

                                            <div className=" justify-center p-1">
                                                <h1 className="text-md uppercase">{movie.name}</h1>
                                                <h1 className="text-md absolute bottom-right">
                                                    <i className="ri-bookmark-line text-secondary mr-5px"></i>
                                                    <span className="text-secondary mr-5px">{movie.bookmarksCount}</span>
                                                </h1>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                            ))}
                        </Row>

                    </Tabs.TabPane>
                </Tabs>
            }

        </div>
    )
}

export default OtherProfile