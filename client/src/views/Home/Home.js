import React, { useEffect, useState } from 'react'
import SingleVideo from './SingleVideo'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
const Home = () => {
    const [videos, setVideos] = useState([])
    useEffect(() => {
        setVideos(['w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2'])
    }, [])
    return (
        <div className="col-md-10 offset-md-1 mt-5">
            <h2> <img src="/images/mediaLogo.jpg" style={{ width: "65px", borderRadius: '10px' }} /> All Videos</h2>
            <hr />
            <div className="row">
                {
                    videos.map(el => (
                        <div className="col-md-3 mb-4">
                            <SingleVideo />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Home
