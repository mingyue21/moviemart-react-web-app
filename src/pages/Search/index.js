import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fullTextSearch } from "../../services/search"
import { Col, message, Row } from "antd";
import { GetAllMovies } from "../../services/movies";
import { Button } from "antd";

function Search() {
    const { searchTerm } = useParams();
    const navigate = useNavigate();
    const [search, setSearch] = useState(searchTerm);
    const [results, setResults] = useState([]);
    const searchMovie = async () => {
        const response = await fullTextSearch(search);
        setResults(response);
        navigate(`/search/${search}`);
    };

    const handleSearchChange = async (value) => {
        setSearch(value);
        const response = await fullTextSearch(value);
        setResults(response);
        navigate(`/search/${value}`);
    };


    useEffect(() => {
        if (searchTerm) {
            setSearch(searchTerm)
            searchMovie();
        }
    }, [searchTerm]);

    return (
        <div>
            <h1>Search Movie</h1>
            <div className="position-rel mt-1">
                <input
                    type="text"
                    className="search-input text-md"
                    placeholder="Search for movies"
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                />
                <Button onClick={searchMovie} className="float-end btn btn-primary flex gap-1 top-15 position-abs right-15">
                    Search
                </Button>
            </div>

            <h2 className="mt-1">Movies</h2>
            <Row gutter={[30,30]} className="mt-2">
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