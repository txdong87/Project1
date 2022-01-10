import React from "react";
import ListSeries from "../Component/Series/listSeries";
import HomeCarousel from "../Component/Home/Carousel";
export default function SeriesPage(props){
    return (
        <div className="home-page-frame">
        <div>
            <ListSeries />
        </div>
        </div>
    )
}