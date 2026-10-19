import React from 'react'
import AllCompo from '../components/AllCompo'
import { CartProvider, useCart } from 'react-use-cart'
function Cart (){
    const {items, updateItemQuantity,removeItem,totalItems,totalUniqueItems,cartTotal,isEmpty} = useCart();
    if(isEmpty){
        return(
          <h3> your cart still Empty</h3>  
        )
    }
    return(
        <div>
    <main className="page">
  <section className="shopping-cart dark">
    <div className="container">
      <div className="block-heading">
        <h2>Shopping Cart ({totalUniqueItems})</h2>
      </div>
      <div className="content">
        <div className="row">
          <div className="col-md-12 col-lg-8">
            <div className="items">

                {items.map((item)=>{
                   return(
              <div className="product">
                <div className="row">
                  <div className="col-md-3">
                    <img
                      className="img-fluid mx-auto d-block image"
                      src={item.images[0]}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="info">
                      <div className="row">
                        <div className="col-md-5 product-name">
                          <div className="product-name">
                            <a href="#">{item.title}</a>
                    
                          </div>
                        </div>
                        <div className="col-md-4 quantity">
                          <label htmlFor="quantity">Quantity:</label>
                         <p> {item.quantity}</p>
                         <button className='btn btn-warning' onClick={()=>updateItemQuantity(item.id,item.quantity-1)}>-</button>
                         <button className='btn btn-success mx-2' onClick={()=>updateItemQuantity(item.id,item.quantity+1)}>+</button>
                         <button className='btn btn-danger' onClick={()=>removeItem(item.id)}>&times;</button>

                        </div>
                        <div className="col-md-3 price">
                          <span>${Math.ceil(item.price*item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                    
                   ) 
                })}
            </div>
          </div>
          <div className="col-md-12 col-lg-4">
            <div className="summary">
              <h3>Summary</h3>
              <div className="summary-item">
                <span className="text">Subtotal</span>
                <span className="price">${Math.ceil(cartTotal)}</span>
              </div>
              <div className="summary-item">
                <span className="text">Discount</span>
                <span className="price">$0</span>
              </div>
              <div className="summary-item">
                <span className="text">Shipping</span>
                <span className="price">$30</span>
              </div>
              <div className="summary-item">
                <span className="text">Total</span>
                <span className="price">${Math.ceil(cartTotal+30)}</span>
              </div>
              <button
                type="button"
                className="btn btn-primary btn-lg btn-block"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>


        </div>
    )
}


function AllCart() {
  return (
    <CartProvider>
<AllCompo/>
<Cart/>
    </CartProvider>
  )
}

export default AllCart