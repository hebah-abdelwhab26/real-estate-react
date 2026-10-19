import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">

              {/* Logo */}
              <NavLink to="/" className="logo">
                <h1>Villa</h1>
              </NavLink>

              {/* Menu */}
              <ul className="nav">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "active" : ""
                    }
                  >
                    Home
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/properties"
                    className={({ isActive }) =>
                      isActive ? "active" : ""
                    }
                  >
                    Properties
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/property-details"
                    className={({ isActive }) =>
                      isActive ? "active" : ""
                    }
                  >
                    Property Details
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive ? "active" : ""
                    }
                  >
                    Contact Us
                  </NavLink>
                </li>
                
                 <li>
                 <NavLink
                    to="/shop"
                    className={({ isActive }) =>
                      isActive ? "active" : ""
                    }
                  >
                    shop
                  </NavLink>
                </li>
                <li>
                  <Link to="/cart">
                    <i className="fa fa-calendar" /> cart
                  </Link>
                </li>
              </ul>

              {/* Mobile menu trigger */}
              <a className="menu-trigger">
                <span>Menu</span>
              </a>

            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;