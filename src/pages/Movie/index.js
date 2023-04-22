import React, { useEffect } from "react";
import { Col, message, Row } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetAllMovies } from "../../services/movies";
import {Link, useNavigate} from "react-router-dom";
import moment from "moment";


function Movie() {
  const [searchText = "", setSearchText] = React.useState("");
  const [movies, setMovies] = React.useState([]);
  const navigate = useNavigate();
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
      <input
        type="text"
        className="search-input search-bar text-md"
        placeholder="Search for movies"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <Row gutter={[20]} className="mt-2">
        {movies
        .filter((movie) => movie.title.toLowerCase().includes(searchText.toLowerCase()))
        .map((movie) => (

          <Col span={6} xs={24} sm={12} md={12} lg={6} xl={6} >
            <div className="movie-card flex flex-col gap-1 cursor-pointer"
                 onClick={() =>
                   navigate(
                    `/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`)}>
            <div className="movie-poster-container" >
            <img className="movie-poster" src={movie.poster} alt="" height={200} width={130} />
            </div>
            <div style={{
            marginLeft: '20px',
            overflow: "hidden",
            textOverflow: "ellipsis"}} className="movie-info uppercase" >{movie.title}</div>
            </div>

          </Col>

        ))}
      </Row>
    </div>
  );
}

export default Movie;