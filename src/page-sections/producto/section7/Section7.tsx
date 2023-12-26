import React, { useEffect, useState } from 'react';
import "./style.css";

const Section7 = ({shared, setShared}:any) => {
    const [link, setLink] = useState("");

    const changedVisible = () => {
        setShared("")
    }

    useEffect(() => {
        let link = window.location.href;
        setLink(link);
    },[link])

    return (
        <div className={`content-shared ${shared}`}>
            <div className={`popup popup_${shared}`}>
                <div className="popup__header">
                    <h4>Compartir</h4>
                    <i className="fa-solid fa-xmark" onClick={changedVisible}></i>
                </div>
                <div className="popup__body">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${link}`} className="facebook"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href={`https://wa.me/?text=${link}`} className='whatsapp'><i className="fa-brands fa-whatsapp"></i></a>
                    <a href={`https://www.instagram.com/?igshid=${link}`} className='instagram'><i className="fa-brands fa-instagram"></i></a>

                </div>
            </div>
        </div>
    )
}

export default Section7;
