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
                {user.isUser && (
                    <Tabs.TabPane tab="Bookings" key = "1">
                        <Bookings />

                    </Tabs.TabPane>
                )}
                {/*<Tabs.TabPane tab="Bookings" key="1">*/}
                {/*    <Bookings />*/}
                {/*</Tabs.TabPane>*/}
                {user.isOwner && (
                    <Tabs.TabPane tab="Theatres" key = "1">
                        <TheatresList />

                    </Tabs.TabPane>
                )}
                {/*<Tabs.TabPane tab="Theatres" key="2">*/}
                {/*    <TheatresList />*/}
                {/*</Tabs.TabPane>*/}
                <Tabs.TabPane tab="Personal Information" key="2">
                    <PersonalInformation />
                </Tabs.TabPane>
                
                <Tabs.TabPane tab="Bookmark" key="3">
                    <BookmarksList />
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
}

export default Profile;
