import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("/data/properties.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load properties");
        }
        return response.json();
      })
      .then((data) => setProperties(data.slice(0, 6)))
      .catch((error) => console.error("Properties loading error:", error));
  }, []);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US").format(price);

  return (
    <div className="properties section">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="section-heading">
              <h6>| Properties</h6>
              <h2>We Provide The Best Property You Like</h2>
            </div>
          </div>

          {properties.map((item) => (
            <div className="col-lg-4 col-md-6" key={item.id}>
              <div className="item">
                <Link to={`/property-details/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                </Link>

                <span className="category">{item.type}</span>
                <h6>{formatPrice(item.price)}</h6>

                <h4>
                  <Link to={`/property-details/${item.id}`}>
                    {item.title}
                  </Link>
                </h4>

                <p>{item.address}, {item.city}</p>

                <ul>
                  <li>
                    Bedrooms: <span>{item.bedrooms}</span>
                  </li>
                  <li>
                    Bathrooms: <span>{item.bathrooms}</span>
                  </li>
                  <li>
                    Area: <span>{item.area}m²</span>
                  </li>
                  <li>
                    Floor: <span>{item.floor}</span>
                  </li>
                </ul>

                <div className="main-button">
                  <Link to={`/property-details/${item.id}`}>
                    View Property
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Properties;