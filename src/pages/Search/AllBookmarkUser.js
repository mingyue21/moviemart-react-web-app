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
    }, [[props.onUpdate]]);

    return (
        <div>
            <h1 className="mt-3 text-2xl">Users Bookmark This Movie</h1>
            <div className="list-of-group">
                {users && users.map((u) => (
                    <div className="group-item mt-2 flex">
                        <h1 className="text-lg mr-3">Username: {u.name}</h1>
                        <Button className="mb-2" onClick={() => {
                            if(user && user._id === u._id){
                                navigate(`/profile`);
                                // navigate(`/profile/${user._id}`);
                            } else {
                                navigate(`/profile/${u._id}`);
                                // navigate(`/profile`);
                            }
                        }}>
                            <span className="text-gray">Profile</span>
                        </Button>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default AllBookmarkUser