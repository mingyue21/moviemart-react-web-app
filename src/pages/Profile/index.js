import React from "react";
import { Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import PageTitle from "../../components/PageTitle";
import TheatresList from "./TheatresList";
import Bookings from "./Bookings";
import PersonalInformation from "./PersonalInformation";
import BookmarksList from "./BookmarksList";

function Profile() {
    const { user } = useSelector((state) => state.users);
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