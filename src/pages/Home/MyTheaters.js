import React, { useEffect } from "react";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { GetAllTheatresByOwner } from "../../services/theatres";
import { useSelector } from "react-redux";

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
            <h1>My Theaters</h1>
            {theaters && theaters.map((theater) => (
                <div>
                    <div>Theater Name: {theater.name}</div>
                    <div>Theater Name: {theater.address}</div>
                    <div>Theater Name: {theater.phone}</div>
                    <div>Theater Name: {theater.email}</div>
                </div>
            ))}
        </div>
    )
}
export default MyTheaters;