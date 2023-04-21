import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Col } from 'antd';
import { getMovie } from "../../services/search";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SetUser } from "../../redux/usersSlice";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { GetCurrentUser } from "../../services/users";
import { userBookmarkMovie } from "../../services/bookmarks";
import { Button } from "antd";
import { checkUserBookmarkMovie } from "../../services/bookmarks";
import AllBookmarkUser from "./AllBookmarkUser";

function SearchDetail() {
    const { user } = useSelector((state) => state.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const  [user, setUser] = useState(null);
    const getCurrentUser = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetCurrentUser();
            dispatch(HideLoading());
            if (response.success) {
                // setUser(response.data);
                dispatch(SetUser(response.data));
            } else {
                dispatch(SetUser(null));
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            dispatch(SetUser(null));
            message.error(error.message);
        }
    }
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [isBookmarked, setBookmarked] = useState();
    const fetchMovie = async () => {
        const response = await getMovie(id);
        setMovie(response);
    };
    const bookmarkMovie = async (payload) => {
        const response = await userBookmarkMovie(user._id, id, payload);
    };

    const checkBookmarked = async () => {
        const response = await checkUserBookmarkMovie(user._id, id);
        if (response.data) {
            setBookmarked(true);
        } else {
            setBookmarked(false);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getCurrentUser();
        }
        fetchMovie();
    }, []);

    useEffect(() => {
        if (user) {
            checkBookmarked();
        }
    }, [user]);

    return (
        <div>
            <h1>SearchDetail</h1>
            <Col span={6}>
                <div className="card flex flex-col gap-1 cursor-pointer" >
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" height={200} width={130} />
                    <div className="flex justify-center p-1">
                        <h1 className="text-md uppercase">{movie.title}</h1>
                        <h1 className="text-md uppercase">{movie.popularity}</h1>
                        <h1 className="text-md uppercase">{movie.release_date}</h1>
                        <h1 className="text-md uppercase">{movie.overview}</h1>
                        <h1 className="text-md uppercase">{movie.vote_average}</h1>
                    </div>
                </div>
                {user && ! isBookmarked ?
                    <Button onClick={() => {
                        bookmarkMovie({name: movie.title, poster: movie.poster_path});
                        setBookmarked(true);
                    }} className="float-end btn btn-primary">
                        Bookmark
                    </Button> :
                    <Button className="float-end btn btn-primary" disabled={true}>
                        Bookmark
                    </Button>
                }
            </Col>

            <AllBookmarkUser movieId={id}/>

        </div>


    );
}

export default SearchDetail;