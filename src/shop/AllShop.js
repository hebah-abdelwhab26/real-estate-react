import React, { useContext } from 'react'
import AllCompo from "../components/AllCompo"
import { CartProvider, useCart } from 'react-use-cart'
import {apivalue} from '../data/AllData'

function Page (){
const {addItem} = useCart();
const data = useContext(apivalue);
return(
  <div>
<div className='section properties'>
  <div className='container'>
    <div className='row properties-box'>
{data.map((item)=> {
  return(
    <div className="col-lg-4 col-md-6 align-self-center mb-30 properties-items col-md-6 adv">
        <div className="item">
          <a href="property-details.html">
            <img src={item.images[0]} alt="" />
          </a>
          <span className="category">{item.category}</span>
          <h6>${item.price}</h6>
          <h4>
            <a href="property-details.html">{item.title}</a>
          </h4>
          <ul>
            <li>
              id: <span>{item.id}</span>
            </li>
            <li>
              rating: <span>{item.rating}</span>
            </li>
            <li>
          descountPercentage: <span>{item.descountPercentage}</span>
            </li>
            <li>
              stock: <span>{item.stock}</span>
            </li>
            <li>
              weight: <span>{item.weight}</span>
            </li>
          </ul>
          <div className="main-button">
<button className='btn btn-dark' onClick={()=>addItem(item)}>add to cart</button>
          </div>
        </div>
      </div>
  )
})}


    </div>
  </div>
</div>
  </div>
)
}

function AllShop() {
  return (
    <CartProvider>
            
    <AllCompo/>
    <Page/>
    </CartProvider>
  )
}

export default AllShop