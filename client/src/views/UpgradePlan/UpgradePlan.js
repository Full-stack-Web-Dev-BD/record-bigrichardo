import { p } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import DoneIcon from '@material-ui/icons/Done';


const UpgradePlan = () => {
  return (
    <>
      <div className="row pt-3 pb-5 bg-white ">
        <div className="col-md-10 offset-md-1">
          <div>
            <h1>Upgrade</h1>
          </div>
          <p className="txt mt-5">Current Plan : Free</p>
          <div className="row">
            <div className=" col-md-4">
              <div className="plan-card">
                <h2>Free</h2>
                <p className="planp" > <DoneIcon /> 3 Offers</p>
                <p className="planp" > <DoneIcon /> 100 Views</p>
                <p className="planp" > <DoneIcon /> 30 Day Storage</p>
                <p className="planp" > <DoneIcon /> Basic Analytics</p>
                <p className="planp" > <DoneIcon /> OfferVid Branding</p>
              </div>
            </div>
            <div className=" col-md-4">
              <div className="plan-card-popular ">
                <div className="d-flex">
                  <h2>Personal</h2>
                  <button className="btn popularBtn" >MOST POPULAR</button>
                </div>
                <div className="mt-5">
                  <p className="planp txt-white"  > <DoneIcon /> 100 Offers</p>
                  <p className="planp txt-white"  > <DoneIcon /> 10,000 Views</p>
                  <p className="planp txt-white"  > <DoneIcon /> 120 Day Storage</p>
                  <p className="planp txt-white"  > <DoneIcon /> full Analytics</p>
                  <p className="planp txt-white"  > <DoneIcon /> OfferVid Branding</p>
                  <p className="planp txt-white"  > <DoneIcon /> Embed Code</p>
                </div>
                <div className="text-center">
                  <button className="btn ppUpbtn">Upgrade</button>
                </div>
              </div>
            </div>
            <div className=" col-md-4">
              <div className="plan-card">
                <h2>Expert</h2>
                <div className="mt-5">
                  <p className="planp" > <DoneIcon /> Unlimited Offers</p>
                  <p className="planp" > <DoneIcon /> 50,000 Views</p>
                  <p className="planp" > <DoneIcon /> 365 Day Storage</p>
                  <p className="planp" > <DoneIcon /> Full Analytics</p>
                  <p className="planp" > <DoneIcon /> Custom Branding</p>
                  <p className="planp" > <DoneIcon /> Embed Code</p>
                </div>
                <div className="text-center">
                  <button className="btn exUpBtn">Upgrade</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpgradePlan
