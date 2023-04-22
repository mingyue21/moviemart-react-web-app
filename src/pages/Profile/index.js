import React, { useEffect } from "react";
import { Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import PageTitle from "../../components/PageTitle";
import TheatresList from "./TheatresList";
import Bookings from "./Bookings";
import PersonalInformation from "./PersonalInformation";
import BookmarksList from "./BookmarksList";
import { useNavigate } from "react-router-dom";

function Profile() {
    const { user } = useSelector((state) => state.users);
    console.log(user)
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div>
            <PageTitle title="Profile" />

            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Personal Information" key="1">
                    <PersonalInformation />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Bookmarks" key="2">
                    <BookmarksList />
                </Tabs.TabPane>

                {user.isUser && (
                    <Tabs.TabPane tab="Bookings" key="3">
                        <Bookings />
                    </Tabs.TabPane>
                )}

                {user.isOwner && (
                    <Tabs.TabPane tab="Theatres" key="4">
                        <TheatresList />
                    </Tabs.TabPane>
                )}
            </Tabs>
        </div>
    );
}

export default Profile;