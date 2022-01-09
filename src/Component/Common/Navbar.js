import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import MarvelIcon from '../../Assets/image/marvel-icon.png'

export default function Navbar(props) {
    const [activeUrl, setActiveUrl] = useState('')
    const navigate = useNavigate()
    const url = window.location.href

    useEffect(() => {

        if ( url.indexOf('character') >= 0){
            setActiveUrl('character')
        }else if ( url.indexOf('series') >= 0){
            setActiveUrl('series')
        }else{
            setActiveUrl('home')
        }
    }, [url])

    return (
        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
            <a className="navbar-brand" onClick={()=>navigate('/')}><img style={{width: '100px', height: '80px'}} src={MarvelIcon} /></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav">
                    <li className={`nav-item ${activeUrl === 'home' ? 'active' : ''}`} style={{cursor: 'pointer'}}>
                        <a className="nav-link" onClick={()=>navigate('/')}>HOME</a>
                    </li>
                    <li className={`nav-item ${activeUrl === 'character' ? 'active' : ''}`} style={{cursor: 'pointer'}}>
                        <a className="nav-link" onClick={()=>navigate('/character')}>CHARACTER LIST</a>
                    </li>
                    <li className={`nav-item ${activeUrl === 'series' ? 'active' : ''}`} style={{cursor: 'pointer'}}>
                        <a className="nav-link" onClick={()=>navigate('/series')}>SERIES LIST</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}