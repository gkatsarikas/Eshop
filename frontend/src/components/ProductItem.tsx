import { Button, Card } from "react-bootstrap"
import { Product } from "../types/Product"
import { Link} from "react-router-dom"
import { useContext } from "react"
import { Store } from "../Store"
import { CartItem } from "../types/Cart"
import { toCartItem } from "../utils"


function ProductItem({product}: {product: Product}){

    const {state,dispatch} = useContext(Store)
    const {cart: {cartItems}} = state


    const addToCart = (item: CartItem) => {
      const existingItem = cartItems.find((x) => x._id === product._id)
      const amount = existingItem ? existingItem.amount + 1 : 1

      if(product.quantity < amount){
        alert('Sorry, product is unavailable.')
        return 
      }

      dispatch({
        type: 'CART_ADD_ITEM',
        payload: {...item, amount},
      })

      console.log('Product added to cart')
    }

    return (

    <Card>
      <Link to={`/product/${product.title}`}>
        <img src={product.img} className="card-img-top" alt={product.title} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.title}`}>
          <Card.Title>{product.title}</Card.Title>
        </Link>
        <Card.Text>${product.price}</Card.Text>
        {product.quantity === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCart(toCartItem(product))}>
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>

    )
}

export default ProductItem