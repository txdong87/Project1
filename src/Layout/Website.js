import React from "react";
import Navbar from "../Component/Common/Navbar";
import Footer from "../Component/Common/Footer";

export default function WebLayout(props) {
    return (
        <div>
            <Navbar />
            {props.children}
            <Footer />
        </div>
    )
}