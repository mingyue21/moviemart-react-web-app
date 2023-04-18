import React, {useEffect, useState} from 'react';
import {message} from 'antd';
import {GetCurrentUser} from "../services/users";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SetUser} from "../redux/usersSlice";
import {HideLoading, ShowLoading} from "../redux/loadersSlice";

function ProtectedRoute({children}){
    const { user } = useSelector((state) => state.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const  [user, setUser] = useState(null);
    const getCurrentUser = async() => {
        try {
            dispatch(ShowLoading());
            const response = await GetCurrentUser();
            dispatch(HideLoading());
            if(response.success){
                // setUser(response.data);
                dispatch(SetUser(response.data));
            }else{
                dispatch(SetUser(null));
                message.error(response.message);
            }
        }catch (error) {
            dispatch(HideLoading());
            dispatch(SetUser(null));
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
                    <h1 className="text-2xl text-white cursor-pointer"
                        onClick={() => navigate("/")}
                    >MOVIEMART</h1>
                </div>

                <div className="bg-white p-1 flex gap-1">
                    <i className="ri-shield-user-line text-primary"></i>
                    <h1 className="text-sm underline"
                        onClick={() => {
                            if (user.isAdmin) {
                                navigate("/admin");
                            } else {
                                navigate("/profile");
                            }
                        }}
                    >
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
