
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AllCompo from "../components/AllCompo";

const API_URL = "/data/properties.json";

function SectionPro() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProperties() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("تعذر تحميل العقارات من الخادم");
        }

        const result = await response.json();

        const properties = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
          ? result.data
          : [];

        setData(properties);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "حدث خطأ أثناء تحميل العقارات");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProperties();

    return () => controller.abort();
  }, []);

  const filteredData = data.filter((item) => {
    const term = search.trim().toLowerCase();

    if (!term) return true;

    return [
      item.id,
      item.title,
      item.name,
      item.address,
      item.city,
      item.type,
      item.category,
      item.purpose,
    ].some((value) =>
      String(value ?? "").toLowerCase().includes(term)
    );
  });

  const formatPrice = (price) => {
    const amount = Number(price);

    if (price == null || price === "") return "السعر غير محدد";
    if (!Number.isFinite(amount)) return price;

    return `${amount.toLocaleString("en-US")} ر.س`;
  };

  return (
    <div>
      <AllCompo />

      <div className="section properties">
        <div className="container">
          <div className="row properties-box">
            <div className="col-md-12 m-auto">
              <input
                className="form-control mb-4"
                type="search"
                placeholder="ابحث باسم العقار أو المدينة أو النوع..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            {loading && (
              <div className="col-12">
                <p>جارٍ تحميل العقارات...</p>
              </div>
            )}

            {error && (
              <div className="col-12">
                <p role="alert">{error}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => window.location.reload()}
                >
                  إعادة المحاولة
                </button>
              </div>
            )}

            {!loading &&
              !error &&
              filteredData.map((item) => {
                const image =
                  item.image ||
                  (Array.isArray(item.images) ? item.images[0] : null) ||
                  "https://placehold.co/600x400?text=Property";

                const title =
                  item.title ||
                  item.name ||
                  item.address ||
                  `عقار رقم ${item.id}`;

                return (
                  <div
                    key={item.id}
                    className="col-lg-4 col-md-6 align-self-center mb-30 properties-items adv"
                  >
                    <div className="item">
                      <Link to={`/property-details/${item.id}`}>
                        <img
                          src={image}
                          alt={title}
                          loading="lazy"
                        />
                      </Link>

                      <span className="category">
                        {item.type || item.category || "عقار"}
                      </span>

                      <h6>{formatPrice(item.price)}</h6>

                      <h4>
                        <Link to={`/property-details/${item.id}`}>
                          {title}
                        </Link>
                      </h4>

                      <ul>
                        <li>
                          المدينة: <span>{item.city || "—"}</span>
                        </li>
                        <li>
                          غرف النوم: <span>{item.bedrooms ?? "—"}</span>
                        </li>
                        <li>
                          الحمامات: <span>{item.bathrooms ?? "—"}</span>
                        </li>
                        <li>
                          المساحة:{" "}
                          <span>
                            {item.area != null ? `${item.area} م²` : "—"}
                          </span>
                        </li>
                        <li>
                          الغرض: <span>{item.purpose || "—"}</span>
                        </li>
                      </ul>

                      <div className="main-button">
                        <Link to={`/property-details/${item.id}`}>
                          تفاصيل العقار
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}

            {!loading && !error && filteredData.length === 0 && (
              <div className="col-12">
                <p>لا توجد عقارات مطابقة للبحث.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionPro;

