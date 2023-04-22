import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message, Row, Table, Col } from "antd";
import { GetBookingsOfUser } from "../../services/bookings";
import moment from "moment";

function MyBookings() {
    const { user } = useSelector((state) => state.users);
    const [bookings = [], setBookings] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetBookingsOfUser(user._id);
            if (response.success) {
                setBookings(response.data);
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
                <div className="title-box">
                    <h2 className="section-title">My Bookings</h2>
                </div>
                <Row gutter={[16, 16]}>
                    {bookings.map((booking) => (
                        <Col span={24}>
                            <div className="booking-card" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <h3 className="booking-movie-title uppercase">
                                        {booking.show.movie.title} ({booking.show.movie.language})
                                    </h3>
                                    <div className="divider"></div>
                                    <p className="booking-info">
                                        {booking.show.theatre.name} ({booking.show.theatre.address})
                                    </p>
                                    <p className="booking-info">
                                        Date & Time: {moment(booking.show.date).format("MMM Do YYYY")}{" "}
                                        - {moment(booking.show.time, "HH:mm").format("hh:mm A")}
                                    </p>

                                    <p className="booking-info">
                                        Amount : $ {booking.show.ticketPrice * booking.seats.length}
                                    </p>
                                    <p className="booking-info">Booking ID: {booking._id}</p>
                                </div>

                                <div className="booking-image" style={{ marginLeft: 'auto' }}>
                                    <img
                                        src={booking.show.movie.poster}
                                        alt={`${booking.show.movie.title} poster`}
                                        height={100}
                                        width={100}
                                        className="br-1"
                                    />
                                    <p className="booking-info">Seats: {booking.seats.join(", ")}</p>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>

    );
}

export default MyBookings;