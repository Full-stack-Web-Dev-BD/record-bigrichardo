import React from 'react'
import './anim.css'
import AvTimerIcon from '@material-ui/icons/AvTimer';
const RecordingAnimation = () => {
  return (
    <div className="pt-5 pb-5">
      <div className="charging_anim">
        <figure>
          <div className="clock_text">
            <h2 style={{ display: 'flex' }}>  <AvTimerIcon />  <span> 12</span>:<span> 12 </span>:<span> 12 </span></h2>
          </div>
          <div class="c"></div>
          <div class="c2"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <div class="c3"></div>
          <div class="c4"></div>
          <div class="c5"></div>
          <div class="c6"></div>
        </figure>
      </div>
    </div>
  )
}

export default RecordingAnimation
