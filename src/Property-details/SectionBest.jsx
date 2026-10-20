
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "/data/properties.json";

const tabs = [
  { id: "apartment", label: "Apartment", types: ["شقة", "Apartment", "apartment"] },
  { id: "villa", label: "Villa House", types: ["فيلا", "منزل", "Villa", "House", "villa"] },
  { id: "penthouse", label: "Penthouse", types: ["بنتهاوس", "Penthouse", "penthouse"] },
];

function SectionBest() {
  const [properties, setProperties] = useState([]);
  const [activeTab, setActiveTab] = useState("apartment");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProperties() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("تعذر تحميل العقارات من الخادم");
        }

        const result = await response.json();
        const list = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
          ? result.data
          : [];

        if (!cancelled) setProperties(list);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProperties();

    return () => {
      cancelled = true;
    };
  }, []);

  const normalize = (value) =>
    String(value ?? "").trim().toLowerCase();

  const getType = (property) =>
    property.type ?? property.category ?? "";

  const getImage = (property) =>
    property.image ??
    property.image_url ??
    property.images?.[0] ??
    "https://placehold.co/800x550?text=Property";

  const getTitle = (property) =>
    property.title ?? property.name ?? property.address ?? "عقار";

  const formatPrice = (price) => {
    const number = Number(price);
    return Number.isFinite(number)
      ? `${number.toLocaleString("en-US")} SAR`
      : "السعر غير محدد";
  };

  const matchesTab = (property, tab) => {
    const type = normalize(getType(property));

    return tab.types.some((item) => normalize(item) === type);
  };

  const currentTab = tabs.find((tab) => tab.id === activeTab);
  const selectedProperties = properties.filter((property) =>
    matchesTab(property, currentTab)
  );

  const property = selectedProperties[0];

  return (
    <div className="section best-deal">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="section-heading">
              <h6>| Best Deal</h6>
              <h2>Find Your Best Deal Right Now!</h2>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="tabs-content">
              <div className="row">
                <div className="nav-wrapper">
                  <ul className="nav nav-tabs" role="tablist">
                    {tabs.map((tab) => (
                      <li className="nav-item" role="presentation" key={tab.id}>
                        <button
                          className={`nav-link ${
                            activeTab === tab.id ? "active" : ""
                          }`}
                          type="button"
                          role="tab"
                          aria-selected={activeTab === tab.id}
                          onClick={() => setActiveTab(tab.id)}
                        >
                          {tab.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="tab-content w-100">
                  <div className="tab-pane fade show active" role="tabpanel">
                    {loading && <p>Loading properties...</p>}

                    {error && <p role="alert">{error}</p>}

                    {!loading && !error && !property && (
                      <p>
                        لا توجد عقارات من هذا النوع. تأكد من قيمة حقل type
                        في بيانات Laravel.
                      </p>
                    )}

                    {!loading && !error && property && (
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="info-table">
                            <ul>
                              <li>
                                Price <span>{formatPrice(property.price)}</span>
                              </li>
                              <li>
                                Total Space{" "}
                                <span>{property.area ?? "—"} m²</span>
                              </li>
                              <li>
                                Floor number{" "}
                                <span>{property.floor ?? "—"}</span>
                              </li>
                              <li>
                                Bedrooms{" "}
                                <span>{property.bedrooms ?? "—"}</span>
                              </li>
                              <li>
                                Bathrooms{" "}
                                <span>{property.bathrooms ?? "—"}</span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <img
                            src={getImage(property)}
                            alt={getTitle(property)}
                            loading="lazy"
                          />
                        </div>

                        <div className="col-lg-3">
                          <h4>{getTitle(property)}</h4>
                          <p>
                            <strong>Type:</strong> {getType(property)}
                            <br />
                            <strong>Address:</strong>{" "}
                            {property.address ?? property.city ?? "السعودية"}
                            <br />
                            <strong>Purpose:</strong>{" "}
                            {property.purpose ?? "بيع"}
                          </p>

                          <div className="icon-button">
                            <Link to={`/SingleProduct/${property.id}`}>
                              View Property Details
                            </Link>
                          </div>

                          {selectedProperties.length > 1 && (
                            <div className="mt-3">
                              <label htmlFor="best-property">
                                اختر عقارًا آخر
                              </label>
                              <select
                                id="best-property"
                                className="form-control"
                                value={property.id}
                                onChange={(event) => {
                                  const chosen = selectedProperties.find(
                                    (item) =>
                                      String(item.id) === event.target.value
                                  );

                                  if (chosen) {
                                    setActiveTab(tabForProperty(chosen));
                                  }
                                }}
                              >
                                {selectedProperties.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {getTitle(item)}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function tabForProperty(item) {
    const found = tabs.find((tab) => matchesTab(item, tab));
    return found?.id ?? "apartment";
  }
}

export default SectionBest;
