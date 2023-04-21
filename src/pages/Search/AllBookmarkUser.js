import React from 'react'
import { useState } from 'react'
import { getAllBookmarkUser } from '../../services/bookmarks'
import { useEffect } from 'react'
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AllBookmarkUser(props) {
    const { user } = useSelector((state) => state.users);
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        const response = await getAllBookmarkUser(props.movieId);
        setUsers(response);
    }
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Users bookmark this movie</h1>
            <div className="list-of-group">
                {users && users.map((u) => (
                    <div className="group-item">
                        <h1>Username {u.name}</h1>
                        <Button onClick={() => {
                            if(user && user._id === u._id){
                                navigate(`/profile`);
                                // navigate(`/profile/${user._id}`);
                            } else {
                                navigate(`/profile/${u._id}`);
                                // navigate(`/profile`);
                            }
                        }}>Profile</Button> 
                    </div>

                ))}
            </div>
        </div>
    )
}

export default AllBookmarkUser