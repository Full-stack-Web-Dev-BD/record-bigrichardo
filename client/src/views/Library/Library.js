import React from 'react'
import MyVideos from './MyVideos'

const Library = () => {
    return (
        <div>
            <div className="col-md-10 offset-md-1 mt-5">
            <h2> <img src="/images/mediaLogo.jpg" style={{ width: "65px", borderRadius: '10px' }} /> Library </h2>
                <MyVideos />
            </div>
        </div>
    )
}

export default Library
