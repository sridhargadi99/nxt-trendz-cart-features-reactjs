import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const condition = cartList.find(eachCart => eachCart.id === product.id)
    if (condition === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const updateCartList = cartList.map(eachCart => {
        if (eachCart.id === product.id) {
          return {
            ...product,
            quantity: eachCart.quantity + product.quantity,
          }
        }
        return eachCart
      })
      this.setState({cartList: updateCartList})
    }
    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(eachCart => eachCart.id !== id)
    this.setState({cartList: filteredCartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = (id, quantity) => {
    const {cartList} = this.state

    const updatedQuantityList = cartList.map(eachCart => {
      if (eachCart.id === id) {
        return {
          ...eachCart,
          quantity: quantity + 1,
        }
      }
      return eachCart
    })
    this.setState({cartList: updatedQuantityList})
  }

  decrementCartItemQuantity = (id, quantity) => {
    if (quantity <= 1) {
      this.removeCartItem(id)
    } else {
      const {cartList} = this.state
      const updatedQuantityList = cartList.map(eachCart => {
        if (eachCart.id === id) {
          return {
            ...eachCart,
            quantity: quantity - 1,
          }
        }
        return eachCart
      })
      this.setState({cartList: updatedQuantityList})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
