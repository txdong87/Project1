import React from "react";
import HomeCarousel from "../Component/Home/Carousel";
import '../Assets/css/home.scss';
import HomeDetail from "../Component/Home/Detail";

export default function Home(props){
    return (
        <div className="home-page-frame">
            <HomeCarousel {...props} />
            <div style={{marginTop: '50px'}}>
                <HomeDetail />
            </div>
        </div>
    )
}