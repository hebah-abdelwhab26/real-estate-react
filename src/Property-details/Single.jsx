
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api/properties";

function Single() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProperty() {
      try {
        setLoading(true);
        setError("");
        setProperty(null);

        // جلب قائمة العقارات كاملة من Laravel
        const response = await fetch(API_URL, {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("تعذر الاتصال بواجهة العقارات");
        }

        const result = await response.json();

        const properties = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
          ? result.data
          : [];

        // البحث عن العقار المطلوب باستخدام رقمه
        const selectedProperty = properties.find(
          (item) => String(item.id) === String(id)
        );

        if (!selectedProperty) {
          setError("العقار غير موجود في قائمة العقارات.");
          return;
        }

        setProperty(selectedProperty);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "حدث خطأ أثناء تحميل العقار");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProperty();

    return () => controller.abort();
  }, [id]);

  const formatPrice = (price) => {
    if (price == null || price === "") return "غير محدد";

    const amount = Number(price);

    return Number.isFinite(amount)
      ? `${amount.toLocaleString("en-US")} ر.س`
      : price;
  };

  if (loading) {
    return (
      <div className="single-property section">
        <div className="container">
          <p>جارٍ تحميل تفاصيل العقار...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="single-property section">
        <div className="container">
          <p role="alert">{error || "العقار غير موجود"}</p>
          <Link to="/properties" className="btn btn-primary">
            العودة إلى العقارات
          </Link>
        </div>
      </div>
    );
  }

  const image =
    property.image ||
    property.images?.[0] ||
    "https://placehold.co/900x600?text=Property";

  const title =
    property.title ||
    property.name ||
    property.address ||
    `عقار رقم ${property.id}`;

  return (
    <div className="single-property section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="main-image">
              <img src={image} alt={title} />
            </div>

            <div className="main-content">
              <span className="category">
                {property.type || property.category || "عقار"}
              </span>

              <h4>{title}</h4>

              <h5 className="mb-3">
                السعر: {formatPrice(property.price)}
              </h5>

              <p>
                <strong>العنوان:</strong>{" "}
                {property.address || "غير محدد"}
              </p>

              <p>
                <strong>المدينة:</strong>{" "}
                {property.city || "غير محددة"}
              </p>

              <p>
                <strong>الغرض:</strong>{" "}
                {property.purpose || "غير محدد"}
              </p>

              {property.description && (
                <p>{property.description}</p>
              )}
            </div>

            <div className="accordion" id="propertyAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingDetails">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseDetails"
                    aria-expanded="true"
                    aria-controls="collapseDetails"
                  >
                    تفاصيل العقار
                  </button>
                </h2>

                <div
                  id="collapseDetails"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingDetails"
                  data-bs-parent="#propertyAccordion"
                >
                  <div className="accordion-body">
                    <p>رقم العقار: {property.id}</p>
                    <p>نوع العقار: {property.type || "—"}</p>
                    <p>الطابق: {property.floor ?? "—"}</p>
                    <p>المساحة: {property.area ?? "—"} م²</p>
                    <p>عدد غرف النوم: {property.bedrooms ?? "—"}</p>
                    <p>عدد الحمامات: {property.bathrooms ?? "—"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="info-table">
              <ul>
                <li>
                  <h4>
                    {property.area != null
                      ? `${property.area} م²`
                      : "غير محدد"}
                    <br />
                    <span>المساحة الإجمالية</span>
                  </h4>
                </li>

                <li>
                  <h4>
                    {property.bedrooms ?? "—"}
                    <br />
                    <span>غرف النوم</span>
                  </h4>
                </li>

                <li>
                  <h4>
                    {property.bathrooms ?? "—"}
                    <br />
                    <span>الحمامات</span>
                  </h4>
                </li>

                <li>
                  <h4>
                    {formatPrice(property.price)}
                    <br />
                    <span>سعر العقار</span>
                  </h4>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Single;
