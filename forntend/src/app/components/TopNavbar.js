'use client';
import React from 'react';
import Script from 'next/script';

function TopNavbar() {
  return (
 <div id="topbar">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between xs-hide">
                  <div className="d-flex">
                    <div className="topbar-widget">
                      <img src="images/svg-white/bell.svg" className="" alt="" />GetGet 50% Discount for AutoDetail New Member
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="topbar-widget me-5">
                      <img src="images/svg-white/phone.svg" className="" alt="" />Call us: +1 800 987 654
                    </div>
                    <div className="topbar-widget">
                      <img src="images/svg-white/envelope.svg" className="" alt="" />Message us: support@autodetail.com
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="clearfix"></div>
          </div>
        </div>
    
  );
}


export default TopNavbar;

