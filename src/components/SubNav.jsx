import React from 'react'

function SubNav() {
  return (
    <div>
        <div className="sub-header">
  <div className="container">
    <div className="row">
      <div className="col-lg-8 col-md-8">
        <ul className="info">
          <li>
            <i className="fa fa-envelope" /> info@company.com
          </li>
          <li>
            <i className="fa fa-map" /> Sunny Isles Beach, FL 33160
          </li>
        </ul>
      </div>
      <div className="col-lg-4 col-md-4">
        <ul className="social-links">
          <li>
            <a href="#">
              <i className="fab fa-facebook" />
            </a>
          </li>
          <li>
            <a href="https://x.com/minthu" target="_blank">
              <i className="fab fa-twitter" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fab fa-linkedin" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fab fa-instagram" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default SubNav