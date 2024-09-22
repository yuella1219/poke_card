import React from 'react'

export const CardSkeleton = () =>{
    return(
        <>
            <div className="card skeleton">
                <div className="species-info">
                    <div className="name"></div>
                    <div className="number"></div>
                </div>
                <div className="img-swiper"></div>
                <div className="skill-info">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>      
            </div>
        </>
    )
}