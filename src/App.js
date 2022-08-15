import React from 'react'
import { commerce } from './lib/commerce'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Products, Navbar, Cart, Checkout } from './components'

const App = () => {
  const [products, setProducts] = useState([])
  const [myCart, setMyCart] = useState({})
  const [order, setOrder] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  console.log('my cart when i run my program for the first time', myCart)

  const fetchProducts = async () => {
    const { data } = await commerce.products.list()

    setProducts(data)
  }

  const fetchCart = async () => {
    setMyCart(await commerce.cart.retrieve())
  }

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity)
    setMyCart(item)
    console.log('this is my cart after i add', item)
  }
  const handleUpdateCartqty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity })
    setMyCart(response)
  }

  const handleRemoveFromCart = async (productId) => {
    const response = await commerce.cart.remove(productId)
    setMyCart(response)
  }

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty()
    setMyCart(response)
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh()
    setMyCart(newCart)
    console.log('Cart has been refreshed!')
  }
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder,
      )
      console.log('this is my token', checkoutTokenId)
      setOrder(incomingOrder)
      refreshCart()
    } catch (error) {
      setErrorMessage('My error message is:', error.data.error.message)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  return (
    <Router>
      <div>
        <Navbar totalItems={myCart?.total_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={myCart}
              handleUpdateCartqty={handleUpdateCartqty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout
              cart={myCart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App

// const getPaypalPaymentId = async (checkoutTokenId, newOrder) => {
//   try {
//     const paypalAuth = await commerce.checkout.capture(checkoutTokenId, {
//       ...newOrder,

//       payment: {
//         gateway: 'paypal',
//         paypal: {
//           action: 'authorize',
//           payment_id: 'PAY-51028384J84281644LGFZXJQ',
//           payer_id: 'VE57TQRTVER5Y',
//         },
//       },
//     })

//     renderPaypalButton(paypalAuth)
//     return
//   } catch (response) {
//     console.log(response)
//     alert(response.message)
//     return
//   } finally {
//   }
// }
// function renderPaypalButton(paypalAuth) {
//   paypal.Button.render(
//     {
//       env: 'production', // Or 'sandbox',
//       commit: true, // Show a 'Pay Now' button
//       payment: function () {
//         return paypalAuth.payment_id // The payment ID from earlier
//       },
//       onAuthorize: function (data, actions) {
//         // Handler if customer DOES authorize payment (this is where you get the payment_id & payer_id you need to pass to Chec)
//         captureOrder(data)
//       },
//       onCancel: function (data, actions) {
//         // Handler if customer does not authorize payment
//       },
//     },
//     '#paypal-button-container',
//   )
// }

// async function captureOrder(checkoutTokenId, newOrder) {
//   try {
//     // Complete capturing the order.
//     const order = await commerce.checkout.capture(checkoutTokenId, {
//       ...newOrder,
//       // We have now changed the action to "capture" as well as included the "payment_id and "payer_id"
//       payment: {
//         gateway: 'paypal',
//         paypal: {
//           action: 'capture',
//           payment_id: 'PAY-51028384J84281644LGFZXJQ',
//           payer_id: 'VE57TQRTVER5Y',
//         },
//       },
//     })

//     // If we get here, the order has been successfully captured and the order detail is part of the `order` variable
//     console.log(order)
//     return
//   } catch (response) {
//     // There was an issue capturing the order with Commerce.js
//     console.log(response)
//     alert(response.message)
//     return
//   } finally {
//     // Any loading state can be removed here.
//   }
// }
