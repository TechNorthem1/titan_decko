import React, { useEffect, useState } from 'react';
import { colors } from "@utils/themeColors";
import Icon from '@component/icon/Icon';
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
                    <Icon variant='small' style={{color: colors.titan.dark, cursor: "pointer"}} onClick={changedVisible}>
                        circle-xmark-regular
                    </Icon>
                </div>
                <div className="popup__body">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${link}`} className="facebook">
                        <Icon variant="small" style={{color:colors.titan.white}}>
                            facebook-f
                        </Icon>
                    </a>
                    <a href={`https://wa.me/?text=${link}`} className='whatsapp'>
                        <Icon variant="small" style={{color:colors.titan.white}}>
                            whatsapp
                        </Icon>
                    </a>
                    <a href={`https://www.instagram.com/?igshid=${link}`} className='instagram'>
                        <Icon variant="small" style={{color:colors.titan.white}}>
                            instagram        
                        </Icon>
                    </a>

                </div>
            </div>
        </div>
    )
}

export default Section7;
