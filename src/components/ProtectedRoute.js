import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { GetCurrentUser } from "../services/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import "../stylesheets/alignment.css";
import { Logout } from "../redux/usersSlice";

function ProtectedRoute({ children }) {
    const { user } = useSelector((state) => state.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const  [user, setUser] = useState(null);
    const getCurrentUser = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetCurrentUser();
            dispatch(HideLoading());
            if (response.success) {
                // setUser(response.data);
                dispatch(SetUser(response.data));
            } else {
                dispatch(SetUser(null));
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            dispatch(SetUser(null));
            message.error(error.message);
        }
    }
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [activeLink, setActiveLink] = useState("/");

    useEffect(() => {
        setIsLoggedIn(!!user);
    }, [user]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getCurrentUser();
        }
        setIsLoggedIn(!!user);
    }, []);

    return (
        <div className="layout p-1 position-rel">
            <div className="header bg-primary flex  p-2">
                <div>
                    <h1 className="text-2xl text-white"
                        // onClick={() => {
                        //     navigate("/")
                        // }
                    >MOVIEMART</h1>
                </div>

                <div className="mr-1">
                    <h1
                        className={`text-xl text-white cursor-pointer ml-8 mr-3 mt-3px ${activeLink === "/" ? " white-underline" : ""}`}
                        onClick={() => {
                            navigate("/");
                            setActiveLink("/")
                    }}>Home</h1>
                </div>

                <div className="hide-on-mobile">
                    <h1
                        className={`text-xl text-white cursor-pointer ml-1 mr-3 mt-3px p-1px ${activeLink === "/movie" ? " white-underline" : ""}`}
                        onClick={() => {
                            if (user) {
                                navigate("/movie")
                                setActiveLink("/movie")
                            } else {
                                navigate("/login")
                                // setActiveLink("/login")
                            }
                        }}
                    >Movie</h1>
                </div>
                <div  className="hide-on-mobile">
                    <h1
                        className={`text-xl text-white cursor-pointer ml-1 mr-3 mt-3px p-1px ${activeLink === "/profile" || activeLink === "/admin" ? "white-underline" : ""}`}
                        onClick={() => {
                            if (user) {
                                if (user.isAdmin) {
                                    navigate("/admin");
                                    setActiveLink("/admin");
                                } else {
                                    navigate("/profile");
                                    setActiveLink("/profile");
                                }
                            } else {
                                navigate("/login")
                            }
                        }}
                    >Profile</h1>
                </div>
            </div>

            <div className="bg-white p-1 flex gap-1 float-end top-25 position-abs right-15" style={{ backgroundColor: 'rgb(245, 245, 245)', borderRadius: '5px' }}>
                <i className="ri-shield-user-line text-primary"/>
                {isLoggedIn ?
                    <h1 className= {`text-sm cursor-pointer ${activeLink === "/profile" || activeLink === "/admin" ? "white-underline" : ""}`}
                        onClick={() => {
                            if (user.isAdmin) {
                                navigate("/admin");
                                setActiveLink("/admin");
                            } else {
                                navigate("/profile");
                                setActiveLink("/profile");
                            }
                        }}
                    >
                        {user.name}
                    </h1>
                    : <h1 className="text-sm underline"
                          onClick={() => navigate("/login")}>
                        Login
                    </h1>
                }
                <i className="ri-logout-circle-r-line ml-2"
    onClick={() => {
        if (user) {
            localStorage.removeItem("token");
            navigate("/");
            setIsLoggedIn(false);
            dispatch(Logout());
            setActiveLink("/")
        }
    }}
    />

            </div>

            <div className="content mt-1 p-1">
                {children}
            </div>

        </div>
    );
}

export default ProtectedRoute;