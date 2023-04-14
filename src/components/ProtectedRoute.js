import React, {useEffect, useState} from 'react';
import {message} from 'antd';
import {GetCurrentUser} from "../apicalls/users";
import {useNavigate} from "react-router-dom";

function ProtectedRoute({children}){
    const navigate = useNavigate();
    const  [user, setUser] = useState(null);
    const getCurrentUser = async() => {
        try {
            const response = await GetCurrentUser();
            if(response.success){
                setUser(response.data);
            }else{
                setUser(null);
                message.error(response.message);
            }
        }catch (error) {
            setUser(null);
            message.error(error.message);

        }
    }


    useEffect(() => {
        if(localStorage.getItem('token')){
            getCurrentUser();
        }else{
            navigate('/login');

        }

    }, []);

    return(
        user && (
        <div className="layout p-1">
            <div className="header bg-primary flex justify-between p-2">
                <div>
                    <h1 className="text-2xl text-white">
                        MOVIEMART
                    </h1>
                </div>

                <div className="bg-white p-1 flex gap-1">
                    <i className="ri-shield-user-line text-primary"></i>
                    <h1 className="text-sm">
                        {user.name}
                    </h1>

                    <i className="ri-logout-circle-r-line ml-2"
                       onClick={() => {
                           localStorage.removeItem("token");
                           navigate("/login");
                       }}
                    ></i>
                </div>

            </div>
            <div className="content mt-1 p-1">
                {children}
            </div>

            {/*{user.name}*/}
            {/*{children}*/}
        </div>
        )
    );
}

export default ProtectedRoute;
