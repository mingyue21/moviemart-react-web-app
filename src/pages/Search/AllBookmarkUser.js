import React from 'react'
import { useState } from 'react'
import { getAllBookmarkUser } from '../../services/bookmarks'
import { useEffect } from 'react'

function AllBookmarkUser(props) {
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        const response = await getAllBookmarkUser(props.movieId);
        setUsers(response);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return(
        <div>
            <h1>Users bookmark this movie</h1>
            {/* <div className="list-of-group">
            {users && users.map((user) => (
                <div className="group-item">
                    <h1>Username</h1>
                    <h1>{user.name}</h1>
                </div>

                ))}
                </div> */}
            </div>
    )
}

export default AllBookmarkUser