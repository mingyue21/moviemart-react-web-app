import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Col } from 'antd';
import { getMovie } from "../../services/search";
import { useParams } from "react-router-dom";

function SearchDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const fetchMovie = async () => {
        const response = await getMovie(id);
        setMovie(response);
      };

    useEffect(() => {
        fetchMovie();
      }, []);

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
            </Col>
        </div>
        );
}

export default SearchDetail;