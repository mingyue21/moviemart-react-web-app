import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fullTextSearch } from "../../services/search"
import { Col, message, Row } from "antd";
import { GetAllMovies } from "../../services/movies";

function Search() {
    const { searchTerm } = useParams();
    const navigate = useNavigate();
    const [search, setSearch] = useState(searchTerm);
    const [results, setResults] = useState([]);
    const searchMovie = async () => {
        const response = await fullTextSearch(search);
        setResults(response);
        navigate(`/search/${search}`);
        console.log(results)
    };

    useEffect(() => {
        if (searchTerm) {
            searchMovie();
        }
    }, [searchTerm]);

    return (
        <div>
            <h1>Search Movie</h1>
            <button onClick={searchMovie} className="float-end btn btn-primary">
                Search
            </button>
            <input
                type="text"
                className="search-input"
                placeholder="Search for movies"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <h2>Movies</h2>
            <Row gutter={[30]} className="mt-2">
                {results && results.map((movie) => (
                    <Col span={6}>
                        <Link to={`/detail/${movie.id}`}>
                            <div className="card flex flex-col gap-1 cursor-pointer" >
                                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" height={200} width={130} />
                                <div className="flex justify-center p-1">
                                    <h1 className="text-md uppercase">{movie.title}</h1>
                                </div>
                            </div>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>


    )
}

export default Search;