/* eslint-disable no-restricted-syntax */
// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const cartCount = cartList.length
      const getCartTotal = () => {
        let total = 0
        for (const eachList of cartList) {
          total += eachList.quantity * eachList.price
        }
        return total
      }

      return (
        <div className="cart-summary-container">
          <div className="cart-summary-container1">
            <h1 className="cart-summary-total-style">
              Order Total:
              <span className="cart-summary-total-style1">
                {' '}
                RS {getCartTotal()}/-
              </span>
            </h1>
            <p className="cart-summary-count-style">
              {cartCount} Items in cart
            </p>
          </div>
          <button className="cart-summary-button-style" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
