import { Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

const Library = () => {

  return (
    <>
      <div className="row pt-3 pb-5 page-content">
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
        </div>
      </div>
    </>
  )
}

export default Library
