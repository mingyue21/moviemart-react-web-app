import React, { useEffect } from "react";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { GetAllTheatresByOwner } from "../../services/theatres";
import { useSelector } from "react-redux";
import { Row, Col } from "antd";

function MyTheaters() {
    const { user } = useSelector((state) => state.users);
    const [theaters, setTheaters] = React.useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetAllTheatresByOwner(user._id);
            if (response.success) {
                setTheaters(response.data);
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
        <h2 className="section-title">My Theaters</h2>

        <Row gutter={[16, 16]}>
            {theaters && theaters.map((theater) => (
                <Col span={24}>
                    <div className="theater-card">
                        <div className="theater-info">Theater Name: {theater.name}</div>
                        <div className="theater-info">Address: {theater.address}</div>
                        <div className="theater-info">Phone: {theater.phone}</div>
                        <div className="theater-info">Email: {theater.email}</div>
                    </div>
                </Col>
            ))}
        </Row>
    </div>
    )
}
export default MyTheaters;