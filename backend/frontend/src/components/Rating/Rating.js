import React from 'react'
import { useTranslation } from "react-i18next"
function Rating({ value, text, color }) {
    const [t,i18n]=useTranslation();
    if(value){
        return (
            <div className="rating d-flex" style={i18n.language == 'ar'?{flexDirection:'row-reverse'}:{flexDirection:'row'}}>
                <div>
                <span>
                    <i style={{ color }} className={
                        value >= 1
                            ? 'fas fa-star'
                            : value >= 0.5
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'
                    }>
    
                    </i>
                </span>
    
                <span>
                    <i style={{ color }} className={
                        value >= 2
                            ? 'fas fa-star'
                            : value >= 1.5
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'
                    }>
    
                    </i>
                </span>
    
                <span>
                    <i style={{ color }} className={
                        value >= 3
                            ? 'fas fa-star'
                            : value >= 2.5
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'
                    }>
    
                    </i>
                </span>
    
                <span>
                    <i style={{ color }} className={
                        value >= 4
                            ? 'fas fa-star'
                            : value >= 3.5
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'
                    }>
    
                    </i>
                </span>
    
                <span>
                    <i style={{ color }} className={
                        value >= 5
                            ? 'fas fa-star'
                            : value >= 4.5
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'
                    }>
    
                    </i>
                </span>
                </div> 
                {text &&
                <span style={i18n.language == 'ar'?{direction:'rtl'}:{direction:'ltr'}}>{i18n.language == 'ar' ?`${text} مراجعه`:`${text} reviews`}</span>
                }   
            </div>
        )
    }
}

export default Rating
