import React from 'react'

function FunFacts() {
  return (
    <div>
        <div className="fun-facts">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="wrapper">
          <div className="row">
            <div className="col-lg-4">
              <div className="counter">
                <h2
                  className="timer count-title count-number"
                  data-to={34}
                  data-speed={1000}
                />
                <p className="count-text ">
                  Buildings
                  <br />
                  Finished Now
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="counter">
                <h2
                  className="timer count-title count-number"
                  data-to={12}
                  data-speed={1000}
                />
                <p className="count-text ">
                  Years
                  <br />
                  Experience
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="counter">
                <h2
                  className="timer count-title count-number"
                  data-to={24}
                  data-speed={1000}
                />
                <p className="count-text ">
                  Awwards
                  <br />
                  Won 2023
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default FunFacts