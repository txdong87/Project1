import React from "react";
import Banner1 from '../../Assets/image/banner1.jpeg';
import Banner2 from '../../Assets/image/banner2.jpeg';
import Banner3 from '../../Assets/image/banner3.jpeg';

export default function HomeCarousel(props) {
    return (
        <div id="demo" className="carousel slide" data-ride="carousel">
            <ul className="carousel-indicators">
                <li data-target="#demo" data-slide-to="0" className="active"></li>
                <li data-target="#demo" data-slide-to="1"></li>
                <li data-target="#demo" data-slide-to="2"></li>
            </ul>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={Banner1} alt="Los Angeles" width="1100" height="500" />
                </div>
                <div className="carousel-item">
                    <img src={Banner2} alt="Chicago" width="1100" height="500" />
                </div>
                <div className="carousel-item">
                    <img src={Banner3} alt="New York" width="1100" height="500" />
                </div>
            </div>

            <a className="carousel-control-prev" href="#demo" data-slide="prev">
                <span className="carousel-control-prev-icon"></span>
            </a>
            <a className="carousel-control-next" href="#demo" data-slide="next">
                <span className="carousel-control-next-icon"></span>
            </a>
        </div>
    )
}