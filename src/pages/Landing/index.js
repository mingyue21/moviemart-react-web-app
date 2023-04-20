import React from "react";
import { Link } from 'react-router-dom';

function Landing() {
    return (
        <div>
            Landing Page
            <div>
                <Link to="/search">
                    Search |
                </Link>
                <Link to="/login">
                    Login
                </Link>
            </div>

        </div>
    )
}

export default Landing;