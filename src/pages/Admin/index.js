import React from "react";
import PageTitle from "../../components/PageTitle";
import { Tabs } from "antd";
import MoviesList from "./MoviesList";
import TheatresList from "./TheatersList";
import BookmarksList from "../Profile/BookmarksList";
import PersonalInformation from "../Profile/PersonalInformation";
import Bookings from "../Profile/Bookings";

function Admin() {
    return (
        <div>
            <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Personal Information" key="1">
                    <PersonalInformation />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Bookmarks" key="2">
                    <BookmarksList />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Bookings" key="3">
                    <Bookings />
                </Tabs.TabPane>
                
                <Tabs.TabPane tab="Movies" key="4">
                    <MoviesList />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Theatres" key="5">
                    <TheatresList />
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
}

export default Admin;