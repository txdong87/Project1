import React from "react";

export default function Footer(props) {
    return (
        <div style={{ width: '100vw', height: '150px', border: '1px solid #b9bdba', background: '#b9bdba', }}>
            <div className="row" style={{marginLeft: 0, marginRight: 0, textAlign: 'center',paddingTop: '40px'}}>
                <div className="col-sm-12 col-md-6">
                    <p style={{fontSize: '1.2em', fontWeight: '600'}}>Data provided by Marvel. © 2021 MARVEL</p>
                </div>
                <div className="col-sm-12 col-md-6">
                    <div className="row" style={{ justifyContent: 'center', flexWrap: 'nowrap', marginLeft: 0, marginRight: 0 }}>
                        <div className="col-md-2 col-lg-1 col-sm-4">
                            <i class='fab fa-facebook' style={{ fontSize: '48px', color: '#0C90F2' }}></i>
                        </div>
                        <div className="col-md-2 col-lg-1 col-sm-4">
                            <i class='fab fa-github' style={{ fontSize: '48px' }}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}