import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import AllCompo from '../components/AllCompo';
import { apivalue } from '../data/AllData';
import { Link } from 'react-router-dom';

function AllSingleProduct() {
  const { id } = useParams();
  const data = useContext(apivalue);

  return (
    <div>
      <AllCompo />

      <div className="section properties">
        <div className="container">
          <div className="row properties-box">

            {data?.map((item) =>
              item.id === Number(id) ? (
                <div
                  key={item.id}
                  className="col-lg-4 col-md-6 align-self-center mb-30 properties-items adv"
                >
                  <div className="item">

                    <Link to={`/singleproduct/${item.id}`}>
                      <img src={item.images?.[0]} alt={item.title} />
                    </Link>

                    <span className="category">{item.category}</span>
                    <h6>${item.price}</h6>

                    <h4>
                      <Link to={`/singleproduct/${item.id}`}>
                        {item.title}
                      </Link>
                    </h4>

                    <ul>
                      <li>id: <span>{item.id}</span></li>
                      <li>rating: <span>{item.rating}</span></li>
                      <li>discountPercentage: <span>{item.discountPercentage}</span></li>
                      <li>stock: <span>{item.stock}</span></li>
                      <li>weight: <span>{item.weight}</span></li>
                    </ul>

                  </div>
                </div>
              ) : null
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default AllSingleProduct;
