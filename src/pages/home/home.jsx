import React from 'react';
import { FaCreditCard, FaShieldAlt } from 'react-icons/fa';
import { SiPix } from 'react-icons/si';
import Img from "../../img/image.png" 
import './home.css'

export default function home() {
    return(
        <>
            <div className="home_container">
                <div className="banner-initial">
                    <img src={Img} className="banner_img"/>
                </div>
                <div className="informative-banner">
                    <div className="list-informations">
                        <div className="info-item">
                        <div className="service-image">
                            <FaCreditCard size={30} />
                        </div>
                        <div className="service-text">
                            <p className="service-text-01">Realizamos parcelamento</p>
                            <p className="service-text-02">em até 6x sem juros</p>
                        </div>
                        </div>

                        <div className="info-item">
                        <div className="service-image">
                            <SiPix size={30} />
                        </div>
                        <div className="pix-text">
                            <p className="service-text-01">5% OFF</p>
                            <p className="service-text-02">para pagamentos no pix</p>
                        </div>
                        </div>

                        <div className="info-item">
                        <div className="service-image">
                            <FaShieldAlt size={30} />
                        </div>
                        <div className="pix-text">
                            <p className="service-text-01">Site seguro</p>
                            <p className="service-text-02">Seus dados estão seguros</p>
                        </div>
                        </div>

                    </div>
                    </div>
            </div>        
        </>
    )
}