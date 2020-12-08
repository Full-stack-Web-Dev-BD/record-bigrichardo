import { Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Axios from 'axios';

import jwtDecoder from 'jwt-decode'




const Library = () => {
  const [videos, setVideos] = useState([])


  const getAll=()=>{
    
    if (localStorage.jwtToken) {
      let ext = jwtDecoder(localStorage.jwtToken)
      Axios.get(`/api/video/get-user-video/${ext.id}`)
      .then(res=>{
        console.log(res.data);
        setVideos(res.data)
      })
      .catch(err=>{
        console.log(err);
      })
    }
  }
  useEffect(() => {
    getAll()
  }, [])

  const deleteVideo=(id)=>{
    Axios.get(`/api/video/delete/${id}`)
    .then(res=>{
      getAll()
    })
    .catch(err=>{
      console.log(err);
    })
  }

  return (
    <>
      <div className="row pt-3 pb-5 bg-white ">
        <div className="col-md-10 offset-md-1">
          <div>
            <h1>Library</h1>
          </div>
          <div className="row mt-4 pt-5">
            <div className="col-md-6 text-left">
              <Typography >23 Offers</Typography>
            </div>
            <div className="col-md-6 text-right">
              <button className="btn last30">SHOW LAST 30 DAYS</button>
            </div>
          </div>
          <div>
            <table class="table mt-5">
              <thead>
                <tr className="noborder">
                  <th scope="col"></th>
                  <th scope="col"><p className="txt">DETAILS</p> </th>
                  <th scope="col"><p className="txt">PRICE</p></th>
                  <th scope="col"><p className="txt">NUMBER</p></th>
                  <th scope="col"><p className="txt">NUMBER</p></th>
                  <th scope="col"><p className="txt">ACTION</p></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                  videos.map(el => (
                    <tr>
                      {/* {console.log(el)} */}
                      <th scope="row">
                        <video  autoPlay muted style={{ height: '95px', width: '145px', borderRadius: '5px' }} src={`/uploads/video/${el.video}`}   ></video>
                        {/* <img src='/images/vidThumb/thumb.jpg' /> */}
                      </th>
                      <td>
                        <div>
                          <p className="txt">23 Nov 2020</p>
                          <p className="video-details txt tb"> {el.headlineText}.{el.additionalText} </p>
                        </div>
                      </td>
                      <td className="lh5">99$</td>
                      <td className="lh5">21,233</td>
                      <td className="lh5">230</td>
                      <td className="lh5"> <button className="btn txt"> <EditIcon /> EDIT </button> </td>
                      <td className="lh5"> <button onClick={e=>{deleteVideo(el._id)}} className="btn txt text-danger"> <DeleteOutlineIcon /> Delete </button> </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Library
