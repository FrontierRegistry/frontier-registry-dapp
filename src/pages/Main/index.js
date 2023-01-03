import React from "react";
import Blog from "../../components/Blog";
import Banner from "../../components/Banner";
import Setup from "../../components/Setup";
import Tutorial from "../../components/Tutorial";
import './index.scss';

const Main = () => {
    return (
        <div className="main">
            <div className="d-flex justify-content-center">
                <div className="container">
                    <Banner />
                    <Blog />
                    <Setup />
                    <Tutorial />
                </div>
            </div>
        </div>
    )
}

export default Main;