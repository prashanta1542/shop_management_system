import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import '../css/footer.css';
export default function Footer() {
    return (
        <div>


            <div className="footer">
                <div className="footer-options">
                    <p><a href="#">ABOUT</a></p>
                    <p><a href="#">CAREER</a></p>
                    <p><a href="#">VISSION</a></p>
                    <p><a href="#">AI TRANSMITION</a></p>
                </div>
                <div className="footer-address">
                    <div className="contacts">
                        <p><a href="#">CONTACTS :</a></p>
                        <p><a href="#">34 , Mohim Das Lane , Firringi Bazar</a></p>
                        <p><a href="#">KOTOWALI</a></p>
                        <p><a href="#">CHATTOGRAM</a></p>
                    </div>
                    <div className="map-view">
                        <p>This is for map view</p>
                    </div>
                </div>
            </div>

            <div className="copywrite">
                    <p>@ ALL RIGHTS RESERVED BY (shop-management-development-team)</p>
                </div>
        </div>
    )
}